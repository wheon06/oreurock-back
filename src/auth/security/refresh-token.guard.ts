import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Refresh token is missing');
    }

    const token = Array.isArray(authHeader) ? authHeader[0] : authHeader;
    const refreshToken = token.replace('Bearer ', '');

    const user = await this.authService.verifyRefreshToken(refreshToken);
    console.log(refreshToken);
    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    request.user = user;
    return true;
  }
}
