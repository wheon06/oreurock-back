import { forwardRef, Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PassportModule } from '@nestjs/passport';
import { Post } from './entities/post.entity';
import { Climb } from '../climb/entities/climb.entity';
import { PostClimb } from '../post-climb/entities/post-climb.entity';
import { PostClimbModule } from '../post-climb/post-climb.module';
import { ClimbModule } from '../climb/climb.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Post, Climb, PostClimb]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    PostClimbModule,
    forwardRef(() => ClimbModule),
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
