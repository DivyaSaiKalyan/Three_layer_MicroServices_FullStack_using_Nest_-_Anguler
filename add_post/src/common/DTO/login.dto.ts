import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Login {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;

  @Column()
  password: string;

  @JoinColumn()
  register: any;
}
