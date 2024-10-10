import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { Repository, Sequelize } from 'sequelize-typescript';
import { SaveUserDto } from './dto/save-user-dto';
import { UserDetail } from '../user-detail/entities/user-detail.entity';
import formatStringToDate from '../../utils/format-string-to-date';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: Repository<User>,
    @InjectModel(UserDetail)
    private readonly userDetailRepository: Repository<UserDetail>,
    private readonly sequelize: Sequelize,
  ) {}

  async save(dto: SaveUserDto) {
    const transaction = await this.sequelize.transaction();
    try {
      const findUser = await this.findByUsername(dto.username);
      if (findUser) throw new ConflictException('User already exists');
      const user = await this.userRepository.create(dto, { transaction });
      const birthdayFormatted = formatStringToDate(dto.birthday);
      const firstDateClimbingFormatted = formatStringToDate(
        dto.firstDateClimbing,
      );
      await this.userDetailRepository.create(
        {
          ...dto,
          id: user.id,
          birthday: birthdayFormatted,
          firstDateClimbing: firstDateClimbingFormatted,
        },
        { transaction },
      );
      await transaction.commit();
      return user;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async updateRefreshToken(username: string, refreshToken: string) {
    return await this.userRepository.update(
      { refreshToken },
      { where: { username: username } },
    );
  }

  async findByRefreshToken(token: string) {
    return await this.userRepository.findOne({
      where: { refreshToken: token },
    });
  }

  async validateUsername(username: string) {
    const findUser = await this.findByUsername(username);
    if (findUser) throw new ConflictException('Username already exists');
  }

  async findByUsername(username: string) {
    return await this.userRepository.findOne({ where: { username: username } });
  }
}
