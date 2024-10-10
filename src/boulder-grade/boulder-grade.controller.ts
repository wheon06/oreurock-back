import { Controller } from '@nestjs/common';
import { BoulderGradeService } from './boulder-grade.service';

@Controller('boulder-grade')
export class BoulderGradeController {
  constructor(private readonly boulderGradeService: BoulderGradeService) {}
}
