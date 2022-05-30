import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  mobilenumber: string;
}
