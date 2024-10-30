import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PlaceBrand } from './entities/place-brand.entity';
import { Repository } from 'sequelize-typescript';

@Injectable()
export class PlaceBrandService {
  constructor(
    @InjectModel(PlaceBrand)
    private readonly placeBrandRepository: Repository<PlaceBrand>,
  ) {}

  async saveAll(dtos: { name: string }[]) {
    return await this.placeBrandRepository.bulkCreate(dtos);
  }
}
