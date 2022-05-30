import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from 'src/Entities/comments.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private readonly commentsRepository: Repository<Comments>,
  ) {}

  async createComment(data: any) {
    const newdata = new Comments();
    newdata.comment = data.comment;
    newdata.postId = data.postId;
    return await this.commentsRepository.save(newdata);
  }

  async getAllComments() {
    return await this.commentsRepository.find();
  }
}
