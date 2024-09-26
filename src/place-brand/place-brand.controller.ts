import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlaceBrandService } from './place-brand.service';

@Controller('place-brand')
export class PlaceBrandController {
  constructor(private readonly placeBrandService: PlaceBrandService) {}
}
