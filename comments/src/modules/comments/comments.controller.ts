import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @Get('getcomments')
  async getAllComments() {
    return await this.commentsService.getAllComments();
  }

  @EventPattern('comment')
  async createComments(data: any) {
    return await this.commentsService.createComment(data);
  }
}
