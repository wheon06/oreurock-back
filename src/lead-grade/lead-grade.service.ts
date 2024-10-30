import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LeadGrade } from './entities/lead-grade.entity';
import { Repository } from 'sequelize-typescript';

@Injectable()
export class LeadGradeService {
  constructor(
    @InjectModel(LeadGrade)
    private readonly leadGradeRepository: Repository<LeadGrade>,
  ) {}

  async save(dtos: { yosemiteGrade: string }[]) {
    return await this.leadGradeRepository.bulkCreate(dtos);
  }

  async findAll() {
    return await this.leadGradeRepository.findAll();
  }

  async findById(id: number) {
    return await this.leadGradeRepository.findByPk(id);
  }
}
