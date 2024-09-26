import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlaceService } from './place.service';

@Controller('place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}
}
