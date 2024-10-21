import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BoardGrade } from './entities/board-grade.entity';
import { Repository } from 'sequelize-typescript';

@Injectable()
export class BoardGradeService {
  constructor(
    @InjectModel(BoardGrade)
    private readonly boardGradeRepository: Repository<BoardGrade>,
  ) {}

  async findAll() {
    return await this.boardGradeRepository.findAll();
  }
}
