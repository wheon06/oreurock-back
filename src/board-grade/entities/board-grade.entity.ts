import {
  AutoIncrement,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Climb } from '../../climb/entities/climb.entity';

@Table({ tableName: 'Board_Grade_TB' })
export class BoardGrade extends Model<BoardGrade> {
  @PrimaryKey
  @AutoIncrement
  @Column({ allowNull: false })
  id: number;

  @Column({ allowNull: false, field: 'v_grade' })
  vGrade: string;

  @HasMany(() => Climb)
  climbs: Climb[];

  @Column({ allowNull: false, field: 'created_at' })
  createdAt: Date;

  @Column({ allowNull: false, field: 'updated_at' })
  updatedAt: Date;
}
