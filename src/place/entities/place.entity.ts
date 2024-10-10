import {
  AutoIncrement,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { PlaceBrand } from '../../place-brand/entities/place-brand.entity';
import { Climb } from '../../climb/entities/climb.entity';
import { BoulderGrade } from '../../boulder-grade/entities/boulder-grade.entity';
import { LeadGrade } from '../../lead-grade/entities/lead-grade.entity';

@Table({ tableName: 'Place_TB' })
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
  @Column({ allowNull: false, field: 'place_brand_id' })
  placeBrandId: number;

  @HasMany(() => Climb)
  climbs: Climb[];

  @HasMany(() => BoulderGrade)
  boulderGrades: BoulderGrade[];

  @HasMany(() => LeadGrade)
  leadGrades: LeadGrade[];

  @Column({ allowNull: false, field: 'created_at' })
  createdAt: Date;

  @Column({ allowNull: false, field: 'updated_at' })
  updatedAt: Date;
}
