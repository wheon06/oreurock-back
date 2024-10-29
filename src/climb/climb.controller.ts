import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ClimbService } from './climb.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import parseJsonArray from '../../utils/parse-json-array';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('climb')
export class ClimbController {
  constructor(private readonly climbService: ClimbService) {}

  @UseGuards(AuthGuard())
  @Post(':id')
  @UseInterceptors(FilesInterceptor('file'))
  async uploadPostWithClimbs(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: any,
    @Param('id') id: number,
  ) {
    const inputDataList = parseJsonArray(body.inputData);
    console.log(inputDataList);
    await this.climbService.createPostsWithTransaction(
      files,
      inputDataList,
      id,
    );
    return { message: '파일과 데이터가 성공적으로 업로드되었습니다.' };
  }

  @UseGuards(AuthGuard())
  @Get()
  async findAllById(@Req() req: Request) {
    const user = req.user;
    return await this.climbService.findAllById(user.id);
  }
}
