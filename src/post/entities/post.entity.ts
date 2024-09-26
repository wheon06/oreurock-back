import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from '../../user/entities/user.entity';
import { Place } from '../../place/entities/place.entity';
import { Record } from '../../record/entities/record.entity';

@Table
export class Post extends Model<Post> {
  @PrimaryKey
  @AutoIncrement
  @Column({ allowNull: false })
  id: number;

  @Column({ allowNull: false })
  description: string;

  @Column({ allowNull: false })
  startTime: Date;

  @Column({ allowNull: false })
  endTime: Date;

  @HasMany(() => Record)
  records: Record[];

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Place)
  @Column({ allowNull: false })
  placeId: number;

  @BelongsTo(() => Place)
  place: User;
}
