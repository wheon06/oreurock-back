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

@Table({ tableName: 'Boulder_Grade_TB' })
export class BoulderGrade extends Model<BoulderGrade> {
  @PrimaryKey
  @AutoIncrement
  @Column({ allowNull: false })
  id: number;

  @Column({ allowNull: false, field: 'color_grade' })
  colorGrade: string;

  @Column({ allowNull: false, field: 'v_grade' })
  vGrade: string;

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
