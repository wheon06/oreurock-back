import {
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from '../../user/entities/user.entity';

@Table({ tableName: 'User_Detail_TB', paranoid: true })
export class UserDetail extends Model<UserDetail> {
  @PrimaryKey
  @ForeignKey(() => User)
  @Column({ allowNull: false })
  id: number;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  phone: string;

  @Column({ allowNull: false })
  birthday: Date;

  @Column({ allowNull: true, field: 'first_date_climbing' })
  firstDateClimbing: Date;

  @Column({ allowNull: false, field: 'created_at' })
  createdAt: Date;

  @Column({ allowNull: false, field: 'updated_at' })
  updatedAt: Date;

  @Column({ allowNull: true, field: 'deleted_at' })
  deletedAt: Date;
}
