import { Controller, Delete, Get, Param, Req, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard())
  @Get()
  async findAllByUserId(@Req() req: Request) {
    const user = req.user;
    return await this.postService.findAllByUserId(user.id);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: number) {
    return await this.postService.deleteById(id);
  }
}
