import { Body, Controller, Post } from '@nestjs/common';
import { UserDetailService } from './user-detail.service';

@Controller('user-detail')
export class UserDetailController {
  constructor(private readonly userDetailService: UserDetailService) {}

  @Post()
  async findAllByBulkId(@Body() idList: number[]) {
    return await this.userDetailService.findAllByBulkId(idList);
  }
}
