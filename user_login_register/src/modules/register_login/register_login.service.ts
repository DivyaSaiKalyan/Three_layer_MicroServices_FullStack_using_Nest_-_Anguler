import { JwtServiceClass } from './../../common/services/jwt.service';
import { LoginDto } from './../../common/DTOS/login.dto';
import { passwordHashing } from './../../common/services/password.hashing';
import { RegisterDto } from './../../common/DTOS/register.dto';
import { Login } from './../../Entities/login.entity';
import { Register } from './../../Entities/register.entity';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RegisterLoginService {
  constructor(
    @InjectRepository(Register)
    private readonly registerRepository: Repository<Register>,
    @InjectRepository(Login)
    private readonly loginRepository: Repository<Login>,
    private readonly passHashing: passwordHashing,
    private readonly jwtServiceClass: JwtServiceClass,
  ) {}

  async createUser(data: RegisterDto) {
    const getone = await this.registerRepository.findOne({
      email: data.email,
    });
    if (getone) {
      throw new HttpException('user already exist', HttpStatus.CONFLICT);
    } else {
      const register = new Register();
      const login = new Login();
      const strongPassword = await this.passHashing.createHasing(data.password);
      register.name = data.name;
      login.password = strongPassword.toString();
      register.password = strongPassword.toString();
      register.mobilenumber = data.mobilenumber;
      register.email = login.username = data.email;
      register.login = login;
      return await this.registerRepository.save(register);
    }
  }

  async loginUser(data: LoginDto) {
    const getUser = await this.loginRepository.findOne({
      username: data.username,
    });
    if (!getUser) {
      throw new UnauthorizedException('incorrect credentials');
    }
    const match = await this.passHashing.decriptPassword(
      data.password,
      getUser.password,
    );
    const token = await this.jwtServiceClass.createJwtToken(getUser);
    if (!getUser || !match) {
      throw new UnauthorizedException('incorrect credentials');
    }
    //window.localStorage.setItem('jwtToken', token);
    return token;
  }
}
