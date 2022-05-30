import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
    },
  );
  await app.listen();
}
bootstrap();

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   // microservice #1
//   app.connectMicroservice<MicroserviceOptions>({
//     transport: Transport.TCP,
//   });
//   await app.startAllMicroservices();
//   await app.listen(3003);
// }
// bootstrap();
