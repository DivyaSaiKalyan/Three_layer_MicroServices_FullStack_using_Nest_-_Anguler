import { LoginDto } from './../../common/DTOS/login.dto';
import { RegisterDto } from './../../common/DTOS/register.dto';
import { RegisterLoginService } from './register_login.service';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';

@Controller('register-login')
@ApiTags('user register and login')
export class RegisterLoginController {
  constructor(
    private readonly registerLoginService: RegisterLoginService,
    @Inject('JWT_TOKEN') private readonly client: ClientProxy,
  ) {}

  @Post('createUser')
  async createUser(@Body() data: RegisterDto) {
    try {
      return await this.registerLoginService.createUser(data);
    } catch (error) {
      throw error;
    }
  }

  @Post('loginUser')
  async loginUser(@Body() data: LoginDto) {
    try {
      const token = await this.registerLoginService.loginUser(data);
      this.client.emit('jwt', token);
      return {
        message: 'login success',
        username: data.username,
      };
    } catch (error) {
      return {
        message: 'login faild',
      };
    }
  }
}
