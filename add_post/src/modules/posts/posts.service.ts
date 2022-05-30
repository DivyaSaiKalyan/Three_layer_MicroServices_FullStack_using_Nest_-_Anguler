import { Register } from './../../common/DTO/register.dto';
import { JwtServiceClass } from './../../common/services/jwt.service';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from 'src/Entities/posts.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private readonly postRepository: Repository<Posts>,
    @InjectRepository(Register, 'logindb')
    private readonly registerRepository: Repository<Register>,
    private readonly jwtService: JwtServiceClass,
  ) {}

  async createPost(postdata: Posts) {
    const value = fs.readFileSync('loginstatus.txt');
    if (value.toString() === 'success') {
      const post = new Posts();
      const newData = Object.assign(post, postdata);
      return await this.postRepository.save(newData);
    } else {
      throw new UnauthorizedException('please login then add the post...');
    }
  }

  async getAllposts() {
    return await this.postRepository.find();
  }

  async addLike(id: number, like: number) {
    const getOne = await this.postRepository.update(
      { id: id },
      { likes: like },
    );
    return getOne;
  }

  async getLoginDataViaJwt(token: any) {
    const result = await this.jwtService.verifyJwtToken(token);
    console.log(result);
    const getdataformlogin = await this.registerRepository.findOne({
      email: result.username,
    });
    if (getdataformlogin) {
      fs.writeFile('loginstatus.txt', 'success', () => {
        console.log('success msg saved');
      });
      setTimeout(() => {
        fs.unlink('loginstatus.txt', () => console.log('text file is clear'));
      }, 300000);
    } else {
      throw new NotFoundException('user is not register');
    }
  }
}
