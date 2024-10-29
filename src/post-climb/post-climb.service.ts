import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PostClimb } from './entities/post-climb.entity';
import { Repository } from 'sequelize-typescript';

@Injectable()
export class PostClimbService {
  constructor(
    @InjectModel(PostClimb)
    private readonly postClimbRepository: Repository<PostClimb>,
  ) {}

  async findByPostId(postId: number) {
    return await this.postClimbRepository.findOne({
      where: { postId: postId },
    });
  }

  async deleteById(id: number) {
    return await this.postClimbRepository.destroy({
      where: { id: id },
      individualHooks: true,
    });
  }
}
