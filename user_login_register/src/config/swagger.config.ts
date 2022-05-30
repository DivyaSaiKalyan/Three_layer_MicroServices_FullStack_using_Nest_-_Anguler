import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('users testing ')
  .setDescription('user rest api tesing ')
  .setVersion('1.0')
  .build();
