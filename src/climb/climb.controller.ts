import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ClimbService } from './climb.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import parseJsonArray from '../../utils/parse-json-array';

@Controller('climb')
export class ClimbController {
  constructor(private readonly climbService: ClimbService) {}

  @Post('file')
  @UseInterceptors(FilesInterceptor('file'))
  async uploadVideo(
    @Body() dataList: string[], // JSON 형식의 문자열로 수신
    @UploadedFiles() fileList: Express.Multer.File[],
  ) {
    // const parsedPosts = dataList.map((data) => JSON.parse(data));s
    console.log(dataList);
    console.log(fileList);
    const parsedPosts = null;
    const result = await this.climbService.createPostsWithTransaction(
      parsedPosts,
      fileList,
    );
    return { message: '데이터가 성공적으로 저장되었습니다.', result };
  }

  @Post()
  @UseInterceptors(FilesInterceptor('file'))
  async uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: any,
  ) {
    const inputDataList = parseJsonArray(body.inputData);
    await this.climbService.createPostsWithTransaction(files, inputDataList);
    return { message: '파일과 데이터가 성공적으로 업로드되었습니다.' };
  }
}
