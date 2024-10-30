import { Controller, Post, Body } from '@nestjs/common';
import { PlaceBrandService } from './place-brand.service';

@Controller('place-brand')
export class PlaceBrandController {
  constructor(private readonly placeBrandService: PlaceBrandService) {}

  @Post()
  async saveAll(@Body() dtos: { name: string }[]) {
    return await this.placeBrandService.saveAll(dtos);
  }
}
