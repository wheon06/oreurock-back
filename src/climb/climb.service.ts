import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Climb } from './entities/climb.entity';
import { Repository, Sequelize } from 'sequelize-typescript';
import * as AWS from 'aws-sdk';
import * as ffmpeg from 'fluent-ffmpeg';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

@Injectable()
export class ClimbService {
  constructor(
    @InjectModel(Climb) private readonly climbRepository: Repository<Climb>,
    private readonly sequelize: Sequelize,
  ) {}

  async createPostsWithTransaction(
    fileList: Express.Multer.File[],
    dataList: any[],
  ) {
    AWS.config.update({
      region: 'ap-northeast-2',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });

    const s3 = new AWS.S3();
    const transaction = await this.sequelize.transaction();

    try {
      const uploadPromises = fileList.map(async (file) => {
        const segments = file.originalname.split('.');
        const key = Date.now() + '.' + segments[segments.length - 1];
        await s3
          .putObject({
            Key: key,
            Body: file.buffer,
            Bucket: 'oreurock-bucket',
          })
          .promise();
        const thumbnailUrl = await this.createThumbnail(file);
        return {
          key,
          thumbnailUrl: thumbnailUrl,
          url: `https://oreurock-bucket.s3.${AWS.config.region}.amazonaws.com/${key}`,
        };
      });

      const uploadResults = await Promise.all(uploadPromises);

      const savePromises = dataList.map((data, index) => {
        return this.climbRepository.create(
          {
            climbType: data.climbType,
            isCompleted: data.isCompleted,
            attempt: data.attempt,
            videoUrl: uploadResults[index].url,
            thumbnailUrl: uploadResults[index].thumbnailUrl,
            placeId: data.placeId,
            userId: 2,
            boulderGradeId:
              data.boulderGradeId !== -1 ? data.boulderGradeId : null,
            leadGradeId: data.leadGradeId !== -1 ? data.leadGradeId : null,
            boardGradeId: data.boardGradeId !== -1 ? data.boardGradeId : null,
          },
          { transaction },
        );
      });

      await Promise.all(savePromises);

      await transaction.commit();
      return HttpStatus.CREATED;
    } catch (error) {
      await transaction.rollback();
      console.log(error);
      return HttpStatus.CONFLICT;
    }
  }

  async createThumbnail(file: Express.Multer.File): Promise<string> {
    const thumbnailDir = path.join(__dirname, 'thumbnail');

    if (!fs.existsSync(thumbnailDir)) fs.mkdirSync(thumbnailDir);

    const key = Date.now() + '';

    const tempFilePath = path.join(os.tmpdir(), file.originalname);
    const thumbnailPath = path.join(thumbnailDir, `${key}-thumbnail.png`);

    fs.writeFileSync(tempFilePath, file.buffer);

    return new Promise((resolve, reject) => {
      ffmpeg(tempFilePath)
        .on('end', async () => {
          const thumbnailUrl = await this.uploadThumbnailToS3(
            thumbnailPath,
            key,
          );

          fs.unlinkSync(tempFilePath);
          resolve(thumbnailUrl);
        })
        .on('error', (err) => {
          fs.unlinkSync(tempFilePath);
          reject(err);
        })
        .screenshots({
          count: 1,
          folder: thumbnailDir,
          filename: `${key}-thumbnail.png`,
          size: '200x?',
        });
    });
  }

  private async uploadThumbnailToS3(
    thumbnailPath: string,
    fileName: string,
  ): Promise<string> {
    const s3 = new AWS.S3();

    const fileStream = fs.createReadStream(thumbnailPath);
    const params = {
      Bucket: 'oreurock-bucket',
      Key: `thumbnails/${fileName}-thumbnail.png`,
      Body: fileStream,
      ContentType: 'image/png',
    };

    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          return reject(err);
        }
        fs.unlinkSync(thumbnailPath);
        resolve(data.Location);
      });
    });
  }
}
