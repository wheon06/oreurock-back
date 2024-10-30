import { Module } from '@nestjs/common';
import { LeadGradeService } from './lead-grade.service';
import { LeadGradeController } from './lead-grade.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { LeadGrade } from './entities/lead-grade.entity';

@Module({
  imports: [SequelizeModule.forFeature([LeadGrade])],
  controllers: [LeadGradeController],
  providers: [LeadGradeService],
  exports: [LeadGradeService],
})
export class LeadGradeModule {}
