import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from '../../user/entities/user.entity';
import { Post } from '../../post/entities/post.entity';
import { Grade } from '../../grade/entities/grade.entity';

@Table
export class Record extends Model<Record> {
  @PrimaryKey
  @AutoIncrement
  @Column({ allowNull: false })
  id: number;

  @Column({ allowNull: false })
  videoUrl: string;

  @Column({ allowNull: false })
  attempts: number;

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Post)
  @Column({ allowNull: false })
  postId: number;

  @BelongsTo(() => Post)
  post: Post;

  @ForeignKey(() => Grade)
  @Column({ allowNull: false })
  gradeId: number;

  @BelongsTo(() => Grade)
  grade: Grade;
}
