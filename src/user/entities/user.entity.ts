import {
  AutoIncrement,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Post } from '../../post/entities/post.entity';
import { Record } from '../../record/entities/record.entity';

@Table({ paranoid: true })
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column({ allowNull: false })
  id: number;

  @Column({ allowNull: false })
  username: string;

  @Column({ allowNull: false })
  password: string;

  @Column({ allowNull: false })
  phone: string;

  @Column({ allowNull: false })
  birthday: Date;

  @Column({ allowNull: true })
  firstDate: Date;

  @HasMany(() => Post)
  posts: Post[];

  @HasMany(() => Record)
  records: Record[];
}
