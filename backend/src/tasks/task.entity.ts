import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Type } from 'class-transformer';

export type TaskStatus = 'todo' | 'doing' | 'done';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ default: 'todo' })
  status!: TaskStatus;

  @Type(() => User)
  @ManyToOne(() => User, { eager: true, nullable: true })
  owner?: User;
}
