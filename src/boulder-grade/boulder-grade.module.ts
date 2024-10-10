import { Module } from '@nestjs/common';
import { BoulderGradeService } from './boulder-grade.service';
import { BoulderGradeController } from './boulder-grade.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BoulderGrade } from './entities/boulder-grade.entity';

@Module({
  imports: [SequelizeModule.forFeature([BoulderGrade])],
  controllers: [BoulderGradeController],
  providers: [BoulderGradeService],
  exports: [BoulderGradeService],
})
export class BoulderGradeModule {}
