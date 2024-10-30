import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './entities/post.entity';
import { Repository } from 'sequelize-typescript';
import { SavePostDto } from './dto/save-post.dto';
import { Transaction } from 'sequelize';
import { Climb } from '../climb/entities/climb.entity';
import { PostClimb } from '../post-climb/entities/post-climb.entity';
import { PostClimbService } from '../post-climb/post-climb.service';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post) private readonly postRepository: Repository<Post>,
    @InjectModel(PostClimb)
    private readonly postClimbRepository: Repository<PostClimb>,
    private readonly postClimbService: PostClimbService,
  ) {}

  async save(dto: SavePostDto, options: { transaction?: Transaction }) {
    return await this.postRepository.create(dto, options);
  }

  async createPostWithClimbs(
    dto: SavePostDto,
    climbs: Climb[],
    options: { transaction?: Transaction },
  ) {
    const post = await this.postRepository.create(dto, options);

    await this.postClimbRepository.bulkCreate(
      climbs.map((climb) => ({ postId: post.id, climbId: climb.id })),
      options,
    );

    return post;
  }

  async deleteById(id: number) {
    const postId = await this.postRepository.destroy({
      where: { id: id },
      individualHooks: true,
    });
  }

  async findAllByUserId(userId: number) {
    return await this.postRepository.findAll({
      where: { userId: userId },
      include: { model: Climb, through: { attributes: [] } },
    });
  }
}
