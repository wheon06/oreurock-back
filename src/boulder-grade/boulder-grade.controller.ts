import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { BoulderGradeService } from './boulder-grade.service';
import { SaveBoulderGradeDto } from './dto/save-boulder-grade.dto';

@Controller('boulder-grade')
export class BoulderGradeController {
  constructor(private readonly boulderGradeService: BoulderGradeService) {}

  @Post()
  async save(@Body() dtos: SaveBoulderGradeDto[]) {
    return await this.boulderGradeService.save(dtos);
  }

  @Get(':placeId')
  async findAll(@Param('placeId') placeId: number) {
    if (!placeId) return HttpStatus.NOT_FOUND;
    return await this.boulderGradeService.findAll(placeId);
  }
}
