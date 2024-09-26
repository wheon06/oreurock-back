import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { PlaceBrand } from '../../place-brand/entities/place-brand.entity';
import { Grade } from '../../grade/entities/grade.entity';

@Table
export class PlaceGrade extends Model<PlaceGrade> {
  @PrimaryKey
  @ForeignKey(() => PlaceBrand)
  @Column({ allowNull: false })
  placeBrandId: number;

  @BelongsTo(() => PlaceBrand)
  placeBrand: PlaceBrand;

  @PrimaryKey
  @ForeignKey(() => Grade)
  @Column({ allowNull: false })
  gradeId: number;

  @BelongsTo(() => Grade)
  grade: Grade;
}
