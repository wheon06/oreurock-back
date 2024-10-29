import { forwardRef, Module } from '@nestjs/common';
import { ClimbService } from './climb.service';
import { ClimbController } from './climb.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Climb } from './entities/climb.entity';
import { PassportModule } from '@nestjs/passport';
import { PostModule } from '../post/post.module';
import { BoulderGradeModule } from '../boulder-grade/boulder-grade.module';
import { PlaceModule } from '../place/place.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Climb]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    forwardRef(() => PostModule),
    PlaceModule,
    BoulderGradeModule,
  ],
  controllers: [ClimbController],
  providers: [ClimbService],
  exports: [ClimbService],
})
export class ClimbModule {}
