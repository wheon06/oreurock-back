import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../user/entities/user.entity';
import { Record } from './entities/record.entity';

@Module({
  imports: [SequelizeModule.forFeature([Record])],
  controllers: [RecordController],
  providers: [RecordService],
})
export class RecordModule {}
