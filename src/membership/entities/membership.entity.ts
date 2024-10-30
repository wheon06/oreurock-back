import {
  AutoIncrement,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from '../../user/entities/user.entity';
import { PlaceBrand } from '../../place-brand/entities/place-brand.entity';

@Table({ tableName: 'Membership_TB' })
export class Membership extends Model<Membership> {
  @PrimaryKey
  @AutoIncrement
  @Column({ allowNull: false })
  id: number;

  @Column({ allowNull: false, field: 'start_date' })
  startDate: Date;

  @Column({ allowNull: false, field: 'end_date' })
  endDate: Date;

  @ForeignKey(() => User)
  @Column({ allowNull: false, field: 'user_id' })
  userId: number;

  @ForeignKey(() => PlaceBrand)
  @Column({ allowNull: false, field: 'place_brand_id' })
  placeBrandId: number;

  @Column({ allowNull: false, field: 'created_at' })
  createdAt: Date;

  @Column({ allowNull: false, field: 'updated_at' })
  updatedAt: Date;

  @Column({ allowNull: true, field: 'deleted_at' })
  deletedAt: Date;
}
