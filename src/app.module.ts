import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { RecordModule } from './record/record.module';
import { PlaceModule } from './place/place.module';
import { GradeModule } from './grade/grade.module';
import { User } from './user/entities/user.entity';
import { Post } from './post/entities/post.entity';
import { Record } from './record/entities/record.entity';
import { Place } from './place/entities/place.entity';
import { Grade } from './grade/entities/grade.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { PlaceBrandModule } from './place-brand/place-brand.module';
import { PlaceGradeModule } from './place-grade/place-grade.module';
import { PlaceBrand } from './place-brand/entities/place-brand.entity';
import { PlaceGrade } from './place-grade/entities/place-grade.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'mariadb',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User, Post, Record, Place, Grade, PlaceBrand, PlaceGrade],
      autoLoadModels: true,
      synchronize: true,
      timezone: '+09:00',
    }),
    UserModule,
    PostModule,
    RecordModule,
    PlaceModule,
    GradeModule,
    PlaceBrandModule,
    PlaceGradeModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
