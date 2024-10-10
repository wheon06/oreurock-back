import { Controller } from '@nestjs/common';
import { LeadGradeService } from './lead-grade.service';

@Controller('lead-grade')
export class LeadGradeController {
  constructor(private readonly leadGradeService: LeadGradeService) {}
}
