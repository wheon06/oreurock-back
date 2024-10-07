import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { Payload } from './security/payload.interface';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';
import { SigninUserDto } from './dto/signin-user-dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validate(
    reqDto: SigninUserDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const existUser = await this.userService.findByUsername(reqDto.username);
    if (!existUser) throw new UnauthorizedException('Invalid ID or password');

    const isValidate = bcrypt.compareSync(reqDto.password, existUser.password);
    if (!isValidate) throw new UnauthorizedException('Invalid ID or password');

    const payload: Payload = { id: existUser.id, username: existUser.username };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    });

    await this.userService.updateRefreshToken(existUser.username, refreshToken);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async refreshAccessToken(req: Request) {
    const authHeader = req.headers['authorization'];

    if (!authHeader)
      throw new UnauthorizedException('Refresh token is missing');

    const value = Array.isArray(authHeader) ? authHeader[0] : authHeader;
    const token = value.replace('Bearer ', '');

    const findUser = await this.userService.findByRefreshToken(token);
    if (!findUser) throw new UnauthorizedException('Refresh token is invalid');

    const payload: Payload = { id: findUser.id, username: findUser.username };

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
      }),
    };
  }

  async verifyRefreshToken(token: string) {
    try {
      const secret = this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET');
      const payload = this.jwtService.verify(token, {
        secret: secret,
      });
      return await this.userService.findByUsername(payload.username);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
