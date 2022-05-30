import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class passwordHashing {
  async createHasing(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  async decriptPassword(password: string, hashCode: string) {
    try {
      return bcrypt.compareSync(password, hashCode);
    } catch (error) {
      throw new UnauthorizedException('your not a valid user');
    }
  }
}
