import { Login } from './login.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsString } from 'class-validator';

@Entity()
export class Register {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  password: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  mobilenumber: string;

  @OneToOne(() => Login, (login) => login.register, { cascade: true })
  login: Login;
}
