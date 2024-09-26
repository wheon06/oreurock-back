import {
  AutoIncrement,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { PlaceBrand } from '../../place-brand/entities/place-brand.entity';

@Table
export class Place extends Model<Place> {
  @PrimaryKey
  @AutoIncrement
  @Column({ allowNull: false })
  id: number;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  address: string;

  @ForeignKey(() => PlaceBrand)
  @Column({ allowNull: false })
  placeBrandId: number;
}
