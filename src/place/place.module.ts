import { Module } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../user/entities/user.entity';
import { Grade } from '../grade/entities/grade.entity';
import { Place } from './entities/place.entity';

@Module({
  imports: [SequelizeModule.forFeature([Place])],
  controllers: [PlaceController],
  providers: [PlaceService],
})
export class PlaceModule {}
