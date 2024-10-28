import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PlaceService } from './place.service';
import { SavePlaceDto } from './dto/save-place.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Post()
  async saveAll(@Body() dtos: SavePlaceDto[]) {
    return await this.placeService.saveAll(dtos);
  }

  @UseGuards(AuthGuard())
  @Get()
  async findAll() {
    return await this.placeService.findAll();
  }
}
