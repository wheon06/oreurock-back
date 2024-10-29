import {
  AutoIncrement,
  BelongsToMany,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Climb } from '../../climb/entities/climb.entity';
import { User } from '../../user/entities/user.entity';
import { PostClimb } from '../../post-climb/entities/post-climb.entity';
import { Place } from '../../place/entities/place.entity';

@Table({ tableName: 'Post_TB', paranoid: true })
export class Post extends Model<Post> {
  @PrimaryKey
  @AutoIncrement
  @Column({ allowNull: false, field: 'id' })
  id: number;

  @Column({ allowNull: false, field: 'is_completed' })
  isCompleted: boolean;

  @Column({ allowNull: false, field: 'thumbnail_url' })
  thumbnailUrl: string;

  @Column({ allowNull: false, field: 'place_name' })
  placeName: string;

  @Column({ allowNull: false, field: 'color_grade' })
  colorGrade: string;

  @Column({ allowNull: false, field: 'v_grade' })
  vGrade: string;

  @ForeignKey(() => User)
  @Column({ allowNull: false, field: 'user_id' })
  userId: number;

  @BelongsToMany(() => Climb, () => PostClimb)
  climbs: Climb[];

  @Column({ allowNull: false, field: 'created_at' })
  createdAt: Date;

  @Column({ allowNull: false, field: 'updated_at' })
  updatedAt: Date;

  @Column({ allowNull: true, field: 'deleted_at' })
  deletedAt: Date;
}
