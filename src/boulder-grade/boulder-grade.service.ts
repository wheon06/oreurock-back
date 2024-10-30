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

  async findAll() {
    return await this.boulderGradeRepository.findAll();
  }

  async findAllByPlaceId(placeId: number) {
    return await this.boulderGradeRepository.findAll({
      where: { placeId: placeId },
    });
  }

  async findOneByPlaceIdDesc(placeId: number) {
    return await this.boulderGradeRepository.findOne({
      where: { placeId: placeId },
      order: [['id', 'DESC']],
    });
  }

  async findById(id: number) {
    return await this.boulderGradeRepository.findByPk(id);
  }

  async findAllByEqualColor(id: number) {
    const boulderGrade = await this.boulderGradeRepository.findByPk(id);
    if (!boulderGrade) return;

    return await this.boulderGradeRepository.findAll({
      where: {
        placeId: boulderGrade.placeId,
        colorGrade: boulderGrade.colorGrade,
      },
    });
  }
}
