import {
  AutoIncrement,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Place } from '../../place/entities/place.entity';
import { Membership } from '../../membership/entities/membership.entity';

@Table({ tableName: 'Place_Brand_TB' })
export class PlaceBrand extends Model<PlaceBrand> {
  @PrimaryKey
  @AutoIncrement
  @Column({ allowNull: false })
  id: number;

  @Column({ allowNull: false })
  name: string;

  @HasMany(() => Membership)
  memberships: Membership[];

  @HasMany(() => Place)
  places: Place[];

  @Column({ allowNull: false, field: 'created_at' })
  createdAt: Date;

  @Column({ allowNull: false, field: 'updated_at' })
  updatedAt: Date;
}
