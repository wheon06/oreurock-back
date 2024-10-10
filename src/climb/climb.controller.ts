import { Controller } from '@nestjs/common';
import { ClimbService } from './climb.service';

@Controller('climb')
export class ClimbController {
  constructor(private readonly climbService: ClimbService) {}
}
