import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlaceGradeService } from './place-grade.service';

@Controller('place-grade')
export class PlaceGradeController {
  constructor(private readonly placeGradeService: PlaceGradeService) {}
}
