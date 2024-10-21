import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BoulderGrade } from './entities/boulder-grade.entity';
import { Repository } from 'sequelize-typescript';
import { SaveBoulderGradeDto } from './dto/save-boulder-grade.dto';

@Injectable()
export class BoulderGradeService {
  constructor(
    @InjectModel(BoulderGrade)
    private readonly boulderGradeRepository: Repository<BoulderGrade>,
  ) {}

  async save(dtos: SaveBoulderGradeDto[]) {
    return await this.boulderGradeRepository.bulkCreate(dtos);
  }

  async findAll(placeId: number) {
    return await this.boulderGradeRepository.findAll({
      where: { placeId: placeId },
    });
  }
}
