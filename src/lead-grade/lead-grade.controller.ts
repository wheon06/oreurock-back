import { Body, Controller, Get, Post } from '@nestjs/common';
import { LeadGradeService } from './lead-grade.service';

@Controller('lead-grade')
export class LeadGradeController {
  constructor(private readonly leadGradeService: LeadGradeService) {}

  @Post()
  async save(@Body() dtos: { yosemiteGrade: string }[]) {
    return await this.leadGradeService.save(dtos);
  }

  @Get()
  async findAll() {
    return await this.leadGradeService.findAll();
  }
}
