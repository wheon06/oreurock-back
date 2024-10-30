import { Module } from '@nestjs/common';
import { PlaceBrandService } from './place-brand.service';
import { PlaceBrandController } from './place-brand.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PlaceBrand } from './entities/place-brand.entity';

@Module({
  imports: [SequelizeModule.forFeature([PlaceBrand])],
  controllers: [PlaceBrandController],
  providers: [PlaceBrandService],
  exports: [PlaceBrandService],
})
export class PlaceBrandModule {}
