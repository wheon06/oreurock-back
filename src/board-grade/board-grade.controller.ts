import { Controller, Get } from '@nestjs/common';
import { BoardGradeService } from './board-grade.service';

@Controller('board-grade')
export class BoardGradeController {
  constructor(private readonly boardGradeService: BoardGradeService) {}

  @Get()
  async findAll() {
    return await this.boardGradeService.findAll();
  }
}
