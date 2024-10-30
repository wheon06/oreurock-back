import {
  AutoIncrement,
  Column,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { UserDetail } from '../../user-detail/entities/user-detail.entity';
import { Membership } from '../../membership/entities/membership.entity';
import { Climb } from '../../climb/entities/climb.entity';

@Table({ tableName: 'User_TB', paranoid: true })
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column({ allowNull: false })
  id: number;

  @Column({ allowNull: false })
  username: string;

  @Column({ allowNull: false })
  password: string;

  @Column({ allowNull: true, field: 'refresh_token' })
  refreshToken: string;

  @HasOne(() => UserDetail)
  userDetail: UserDetail;

  @HasMany(() => Membership)
  memberships: Membership[];

  @HasMany(() => Climb)
  climbs: Climb[];

  @Column({ allowNull: false, field: 'created_at' })
  createdAt: Date;

  @Column({ allowNull: false, field: 'updated_at' })
  updatedAt: Date;

  @Column({ allowNull: true, field: 'deleted_at' })
  deletedAt: Date;
}
