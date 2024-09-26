import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GradeService } from './grade.service';

@Controller('grade')
export class GradeController {}
