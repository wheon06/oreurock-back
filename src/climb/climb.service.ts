import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Climb } from './entities/climb.entity';
import { Repository, Sequelize } from 'sequelize-typescript';
import * as AWS from 'aws-sdk';
import * as ffmpeg from 'fluent-ffmpeg';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { PostService } from '../post/post.service';
import { BoulderGradeService } from '../boulder-grade/boulder-grade.service';
import { PlaceService } from '../place/place.service';
import formatZonedDateTime from '../../utils/format-zone-date-time-to-string';
import { LeadGradeService } from '../lead-grade/lead-grade.service';
import { BoulderGrade } from '../boulder-grade/entities/boulder-grade.entity';
import { BoardGradeService } from '../board-grade/board-grade.service';

@Injectable()
export class ClimbService {
  constructor(
    @InjectModel(Climb) private readonly climbRepository: Repository<Climb>,
    private readonly postService: PostService,
    private readonly placeService: PlaceService,
    private readonly boulderGradeService: BoulderGradeService,
    private readonly leadGradeService: LeadGradeService,
    private readonly boardGradeService: BoardGradeService,
    private readonly sequelize: Sequelize,
  ) {}

  async findAllById(userId: number) {
    return await this.climbRepository.findAll({ where: { userId: userId } });
  }

  async createPostsWithTransaction(
    fileList: Express.Multer.File[],
    dataList: any[],
    userId: number,
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
            date: new Date(formatZonedDateTime(data.date)),
            placeId: data.placeId,
            userId: userId,
            boulderGradeId:
              data.boulderGradeId !== -1 ? data.boulderGradeId : null,
            leadGradeId: data.leadGradeId !== -1 ? data.leadGradeId : null,
            boardGradeId: data.boardGradeId !== -1 ? data.boardGradeId : null,
          },
          { transaction },
        );
      });

      const climbs = await Promise.all(savePromises);

      const isCompleted = climbs.some((climb) => climb.isCompleted);

      const bestClimb = climbs.reduce((prev, current) => {
        if (climbs[0].climbType === '볼더링')
          return prev.boulderGradeId > current.boulderGradeId ? prev : current;
        else if (climbs[0].climbType === '리드')
          return prev.leadGradeId > current.leadGradeId ? prev : current;
        else return prev.boardGradeId > current.boardGradeId ? prev : current;
      });

      const place = await this.placeService.findById(bestClimb.placeId);

      const boulderGradeList =
        await this.boulderGradeService.findAllByEqualColor(
          bestClimb.boulderGradeId,
        );

      const grade = await this.getBestGrade(
        climbs,
        bestClimb,
        boulderGradeList,
      );

      await this.postService.createPostWithClimbs(
        {
          isCompleted: isCompleted,
          thumbnailUrl: bestClimb.thumbnailUrl,
          placeName: place.name,
          colorGrade: boulderGradeList
            ? boulderGradeList[0].colorGrade
            : 'Gray',
          vGrade: grade,
          userId: userId,
        },
        climbs,
        { transaction },
      );

      await transaction.commit();
      return HttpStatus.CREATED;
    } catch (error) {
      await transaction.rollback();
      console.log(error);
      return HttpStatus.CONFLICT;
    }
  }

  getBestGrade = async (
    climbs: Climb[],
    bestClimb: Climb,
    boulderGradeList: BoulderGrade[],
  ) => {
    if (climbs[0].climbType === '볼더링') {
      return boulderGradeList[0].vGrade ===
        boulderGradeList[boulderGradeList.length - 1].vGrade
        ? boulderGradeList[0].vGrade
        : boulderGradeList[0].vGrade +
            '~' +
            boulderGradeList[boulderGradeList.length - 1].vGrade;
    } else if (climbs[0].climbType === '리드') {
      const leadGrade = await this.leadGradeService.findById(
        bestClimb.leadGradeId,
      );
      return leadGrade.yosemiteGrade;
    } else {
      const boardGrade = await this.boardGradeService.findById(
        bestClimb.boardGradeId,
      );
      return boardGrade.vGrade;
    }
  };

  async deleteById(id: number) {
    return await this.climbRepository.destroy({
      where: { id: id },
      individualHooks: true,
    });
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
          size: '300x?',
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
