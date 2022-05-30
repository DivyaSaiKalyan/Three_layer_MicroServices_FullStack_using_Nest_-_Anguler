import { Register } from './register.entity';
import {
  JoinColumn,
  OneToOne,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsEmail, IsString } from 'class-validator';

@Entity()
export class Login {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  username: string;

  @Column()
  @IsString()
  password: string;

  @OneToOne(() => Register, (register) => register.login)
  @JoinColumn()
  register: Register;
}
