import { Module } from '@nestjs/common';
import { BoardGradeService } from './board-grade.service';
import { BoardGradeController } from './board-grade.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BoardGrade } from './entities/board-grade.entity';

@Module({
  imports: [SequelizeModule.forFeature([BoardGrade])],
  controllers: [BoardGradeController],
  providers: [BoardGradeService],
  exports: [BoardGradeService],
})
export class BoardGradeModule {}
