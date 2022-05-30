import { Comment } from './../../common/DTO/comment.dto';
import { Posts } from './../../Entities/posts.entity';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { ClientProxy, EventPattern } from '@nestjs/microservices';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postService: PostsService,
    @Inject('POST_SERVICE') private readonly postClient: ClientProxy,
  ) {}

  @Post('createpost')
  async createPost(@Body() data: Posts) {
    try {
      const newdata = await this.postService.createPost(data);
      return newdata;
    } catch (error) {
      return error;
    }
  }

  @Get('getAllPosts')
  async getAllPosts() {
    try {
      return await this.postService.getAllposts();
    } catch (error) {
      return error;
    }
  }

  @Post('createComment')
  async createComment(@Body() data: Comment) {
    this.postClient.emit('comment', data);
    return data;
  }

  @Put('addLike/:id/:like')
  async addLike(@Param('id') id: number, @Param('like') like: number) {
    return await this.postService.addLike(id, like);
  }

  @EventPattern('jwt')
  async getJwtToken(data: any) {
    return await this.postService.getLoginDataViaJwt(data);
  }
}
