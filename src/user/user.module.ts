import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserDetail } from '../user-detail/entities/user-detail.entity';

@Module({
  imports: [SequelizeModule.forFeature([User, UserDetail])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
