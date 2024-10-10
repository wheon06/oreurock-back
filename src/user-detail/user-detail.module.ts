import { Module } from '@nestjs/common';
import { UserDetailService } from './user-detail.service';
import { UserDetailController } from './user-detail.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserDetail } from './entities/user-detail.entity';

@Module({
  imports: [SequelizeModule.forFeature([UserDetail])],
  controllers: [UserDetailController],
  providers: [UserDetailService],
  exports: [UserDetailService],
})
export class UserDetailModule {}
