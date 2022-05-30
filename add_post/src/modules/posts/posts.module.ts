import { Register } from './../../common/DTO/register.dto';
import { JwtServiceClass } from './../../common/services/jwt.service';
import { Posts } from './../../Entities/posts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule, Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Posts]),
    TypeOrmModule.forFeature([Register], 'logindb'),
    ClientsModule.register([
      {
        name: 'POST_SERVICE',
        transport: Transport.TCP,
        options: { port: 3001 },
      },
    ]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '60s' },
    }),
    CacheModule.register(),
    ConfigModule.forRoot(),
  ],
  controllers: [PostsController],
  providers: [PostsService, JwtServiceClass],
})
export class PostsModule {}
