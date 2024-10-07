import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { SigninUserDto } from './dto/signin-user-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signin(@Body() reqDto: SigninUserDto) {
    return this.authService.validate(reqDto);
  }

  @UseGuards(AuthGuard())
  @Get('authenticate')
  async authenticate(@Req() req: Request): Promise<any> {
    return req.user;
  }

  @Get('refreshAccessToken')
  async refreshAccessToken(@Req() req: Request): Promise<any> {
    return this.authService.refreshAccessToken(req);
  }
}
