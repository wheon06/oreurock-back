import {
  AutoIncrement,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Post } from '../../post/entities/post.entity';
import { Climb } from '../../climb/entities/climb.entity';

@Table({ tableName: 'Post_Climb_TB', paranoid: true })
export class PostClimb extends Model<PostClimb> {
  @PrimaryKey
  @AutoIncrement
  @Column({ allowNull: false, field: 'id' })
  id: number;

  @ForeignKey(() => Post)
  @Column({ allowNull: false, field: 'post_id', onDelete: 'CASCADE' })
  postId: number;

  @ForeignKey(() => Climb)
  @Column({ allowNull: false, field: 'climb_id', onDelete: 'CASCADE' })
  climbId: number;

  @Column({ allowNull: false, field: 'created_at' })
  createdAt: Date;

  @Column({ allowNull: false, field: 'updated_at' })
  updatedAt: Date;

  @Column({ allowNull: true, field: 'deleted_at' })
  deletedAt: Date;
}
