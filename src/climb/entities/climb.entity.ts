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
import { User } from '../../user/entities/user.entity';
import { Place } from '../../place/entities/place.entity';
import { BoulderGrade } from '../../boulder-grade/entities/boulder-grade.entity';
import { LeadGrade } from '../../lead-grade/entities/lead-grade.entity';
import { BoardGrade } from '../../board-grade/entities/board-grade.entity';
import { PostClimb } from '../../post-climb/entities/post-climb.entity';
import { Post } from '../../post/entities/post.entity';

@Table({ tableName: 'Climb_TB', paranoid: true })
export class Climb extends Model<Climb> {
  @PrimaryKey
  @AutoIncrement
  @Column({ allowNull: false, field: 'id' })
  id: number;

  @Column({ allowNull: false, field: 'climb_type' })
  climbType: string;

  @Column({ allowNull: false, field: 'is_completed' })
  isCompleted: boolean;

  @Column({ allowNull: true })
  attempt: number;

  @Column({ allowNull: false, field: 'video_url' })
  videoUrl: string;

  @Column({ allowNull: false, field: 'thumbnail_url' })
  thumbnailUrl: string;

  @Column({ allowNull: false, field: 'date' })
  date: Date;

  @ForeignKey(() => User)
  @Column({ allowNull: false, field: 'user_id' })
  userId: number;

  @ForeignKey(() => Place)
  @Column({ allowNull: false, field: 'place_id' })
  placeId: number;

  @ForeignKey(() => BoulderGrade)
  @Column({ allowNull: true, field: 'boulder_grade_id' })
  boulderGradeId: number;

  @ForeignKey(() => LeadGrade)
  @Column({ allowNull: true, field: 'lead_grade_id' })
  leadGradeId: number;

  @ForeignKey(() => BoardGrade)
  @Column({ allowNull: true, field: 'board_grade_id' })
  boardGradeId: number;

  @BelongsToMany(() => Post, () => PostClimb)
  posts: Post[];

  @Column({ allowNull: false, field: 'created_at' })
  createdAt: Date;

  @Column({ allowNull: false, field: 'updated_at' })
  updatedAt: Date;

  @Column({ allowNull: true, field: 'deleted_at' })
  deletedAt: Date;
}
