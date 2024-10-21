import { Body, Controller, Get, Post } from '@nestjs/common';
import { PlaceService } from './place.service';
import { SavePlaceDto } from './dto/save-place.dto';

@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Post()
  async saveAll(@Body() dtos: SavePlaceDto[]) {
    return await this.placeService.saveAll(dtos);
  }

  @Get()
  async findAll() {
    return await this.placeService.findAll();
  }
}
