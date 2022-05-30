import { Login } from './../DTO/login.dto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class JwtServiceClass {
  constructor(private readonly jwtservice: JwtService) {}
  async createJwtToken(login: Login) {
    return await this.jwtservice.signAsync({ username: login.username });
  }

  async verifyJwtToken(token: string) {
    const verifyToken = await this.jwtservice.verifyAsync(token);
    return verifyToken;
  }

  async deleteToken(response: Response): Promise<string> {
    response.clearCookie('jwt');
    return 'logout success';
  }
}
