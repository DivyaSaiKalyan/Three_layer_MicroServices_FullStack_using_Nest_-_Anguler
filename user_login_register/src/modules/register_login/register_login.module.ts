import { JwtServiceClass } from './../../common/services/jwt.service';
import { JwtModule } from '@nestjs/jwt';
import { passwordHashing } from './../../common/services/password.hashing';
import { Login } from './../../Entities/login.entity';
import { Register } from './../../Entities/register.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RegisterLoginService } from './register_login.service';
import { RegisterLoginController } from './register_login.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Register, Login]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '60s' },
    }),
    ClientsModule.register([{ name: 'JWT_TOKEN', transport: Transport.TCP }]),
  ],
  providers: [RegisterLoginService, passwordHashing, JwtServiceClass],
  controllers: [RegisterLoginController],
})
export class RegisterLoginModule {}
