import { Module } from '@nestjs/common';
import { PostClimbService } from './post-climb.service';
import { PostClimbController } from './post-climb.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostClimb } from './entities/post-climb.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    SequelizeModule.forFeature([PostClimb]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [PostClimbController],
  providers: [PostClimbService],
  exports: [PostClimbService],
})
export class PostClimbModule {}
