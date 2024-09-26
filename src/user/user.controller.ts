import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/security/auth.guard';
import { SaveUserDto } from './dto/save-user-dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('join')
  async join(@Body() dto: SaveUserDto) {
    return await this.userService.save(dto);
  }

  @UseGuards(AuthGuard)
  @Get(':username')
  async join2(@Param('username') username: string) {
    return await this.userService.findByUsername(username);
  }
}
