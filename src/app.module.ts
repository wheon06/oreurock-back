import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { Place } from './place/entities/place.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { PlaceBrandModule } from './place-brand/place-brand.module';
import { PlaceBrand } from './place-brand/entities/place-brand.entity';
import { AuthModule } from './auth/auth.module';
import { UserDetailModule } from './user-detail/user-detail.module';
import { MembershipModule } from './membership/membership.module';
import { BoulderGradeModule } from './boulder-grade/boulder-grade.module';
import { LeadGradeModule } from './lead-grade/lead-grade.module';
import { PlaceModule } from './place/place.module';
import { UserDetail } from './user-detail/entities/user-detail.entity';
import { Membership } from './membership/entities/membership.entity';
import { BoulderGrade } from './boulder-grade/entities/boulder-grade.entity';
import { LeadGrade } from './lead-grade/entities/lead-grade.entity';
import { ClimbModule } from './climb/climb.module';
import { Climb } from './climb/entities/climb.entity';
import { BoardGradeModule } from './board-grade/board-grade.module';
import { BoardGrade } from './board-grade/entities/board-grade.entity';

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
      models: [
        User,
        UserDetail,
        Place,
        PlaceBrand,
        Membership,
        BoulderGrade,
        LeadGrade,
        Climb,
        BoardGrade,
      ],
      autoLoadModels: true,
      synchronize: true,
      timezone: '+09:00',
    }),
    AuthModule,
    UserModule,
    UserDetailModule,
    PlaceModule,
    PlaceBrandModule,
    MembershipModule,
    BoulderGradeModule,
    LeadGradeModule,
    ClimbModule,
    BoardGradeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
