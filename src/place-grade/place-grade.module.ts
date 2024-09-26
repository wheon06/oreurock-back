import { Module } from '@nestjs/common';
import { PlaceGradeService } from './place-grade.service';
import { PlaceGradeController } from './place-grade.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PlaceBrand } from '../place-brand/entities/place-brand.entity';
import { PlaceGrade } from './entities/place-grade.entity';

@Module({
  imports: [SequelizeModule.forFeature([PlaceGrade])],
  controllers: [PlaceGradeController],
  providers: [PlaceGradeService],
})
export class PlaceGradeModule {}
