import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Place } from './entities/place.entity';
import { Repository } from 'sequelize-typescript';
import { SavePlaceDto } from './dto/save-place.dto';

@Injectable()
export class PlaceService {
  constructor(
    @InjectModel(Place) private readonly placeRepository: Repository<Place>,
  ) {}

  async saveAll(dtos: SavePlaceDto[]) {
    return await this.placeRepository.bulkCreate(dtos);
  }

  async findAll() {
    return await this.placeRepository.findAll();
  }

  async findAllByBulkId(idList: number[]) {
    return await this.placeRepository.findAll({ where: { id: idList } });
  }

  async findById(id: number) {
    return await this.placeRepository.findByPk(id);
  }
}
