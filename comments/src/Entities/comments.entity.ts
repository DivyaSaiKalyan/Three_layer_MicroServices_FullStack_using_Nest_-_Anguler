import { IsInt, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsInt()
  postId: number;

  @Column()
  @IsString()
  comment: string;
}
