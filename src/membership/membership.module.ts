import { Module } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { MembershipController } from './membership.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Membership } from './entities/membership.entity';

@Module({
  imports: [SequelizeModule.forFeature([Membership])],
  controllers: [MembershipController],
  providers: [MembershipService],
  exports: [MembershipService],
})
export class MembershipModule {}
