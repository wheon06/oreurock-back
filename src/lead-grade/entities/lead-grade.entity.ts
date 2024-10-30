import {
  AutoIncrement,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Climb } from '../../climb/entities/climb.entity';

@Table({ tableName: 'Lead_Grade_TB' })
export class LeadGrade extends Model<LeadGrade> {
  @PrimaryKey
  @AutoIncrement
  @Column({ allowNull: false })
  id: number;

  @Column({ allowNull: false, field: 'yosemite_grade' })
  yosemiteGrade: string;

  @HasMany(() => Climb)
  climbs: Climb[];

  @Column({ allowNull: false, field: 'created_at' })
  createdAt: Date;

  @Column({ allowNull: false, field: 'updated_at' })
  updatedAt: Date;
}
