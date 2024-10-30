import { Module } from '@nestjs/common';
import { UserDetailService } from './user-detail.service';
import { UserDetailController } from './user-detail.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserDetail } from './entities/user-detail.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    SequelizeModule.forFeature([UserDetail]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [UserDetailController],
  providers: [UserDetailService],
  exports: [UserDetailService],
})
export class UserDetailModule {}
