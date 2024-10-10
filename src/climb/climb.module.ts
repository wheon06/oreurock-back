import { Module } from '@nestjs/common';
import { ClimbService } from './climb.service';
import { ClimbController } from './climb.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Climb } from './entities/climb.entity';

@Module({
  imports: [SequelizeModule.forFeature([Climb])],
  controllers: [ClimbController],
  providers: [ClimbService],
  exports: [ClimbService],
})
export class ClimbModule {}
