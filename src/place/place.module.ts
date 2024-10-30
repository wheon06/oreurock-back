import { Module } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Place } from './entities/place.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    SequelizeModule.forFeature([Place]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [PlaceController],
  providers: [PlaceService],
  exports: [PlaceService],
})
export class PlaceModule {}
