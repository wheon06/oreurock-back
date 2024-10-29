import { Controller } from '@nestjs/common';
import { PostClimbService } from './post-climb.service';

@Controller('post-climb')
export class PostClimbController {
  constructor(private readonly postClimbService: PostClimbService) {}
}
