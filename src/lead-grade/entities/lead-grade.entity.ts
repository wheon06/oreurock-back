import {
  AutoIncrement,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Place } from '../../place/entities/place.entity';
import { Climb } from '../../climb/entities/climb.entity';

@Table({ tableName: 'Lead_Grade_TB' })
export class LeadGrade extends Model<LeadGrade> {
  @PrimaryKey
  @AutoIncrement
  @Column({ allowNull: false })
  id: number;

  @Column({ allowNull: false, field: 'yosemite_grade' })
  yosemiteGrade: string;

  @ForeignKey(() => Place)
  @Column({ allowNull: false, field: 'place_id' })
  placeId: number;

  @HasMany(() => Climb)
  climbs: Climb[];

  @Column({ allowNull: false, field: 'created_at' })
  createdAt: Date;

  @Column({ allowNull: false, field: 'updated_at' })
  updatedAt: Date;
}
