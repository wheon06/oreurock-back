import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SaveUserDto } from './dto/save-user-dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('join')
  async signup(@Body() dto: SaveUserDto) {
    return await this.userService.save(dto);
  }

  @Get(':username')
  async validateUsername(@Param('username') username: string) {
    await this.userService.validateUsername(username);
  }
}
