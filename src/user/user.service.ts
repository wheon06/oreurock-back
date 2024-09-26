import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { Repository } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: Repository<User>,
  ) {}

  async save(dto: SaveUserDto) {
    const findUser = await this.findByUsername(dto.username);
    if (findUser) throw new ConflictException('User already exists');
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    return await this.userRepository.create({
      ...dto,
      password: hashedPassword,
    });
  }

  async findByUsername(username: string) {
    return await this.userRepository.findOne({ where: { username: username } });
  }
}
