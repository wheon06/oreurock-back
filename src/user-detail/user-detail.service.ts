import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserDetail } from './entities/user-detail.entity';
import { Repository } from 'sequelize-typescript';

@Injectable()
export class UserDetailService {
  constructor(
    @InjectModel(UserDetail)
    private readonly userDetailRepository: Repository<UserDetail>,
  ) {}

  async findAllByBulkId(idList: number[]) {
    return await this.userDetailRepository.findAll({ where: { id: idList } });
  }
}
