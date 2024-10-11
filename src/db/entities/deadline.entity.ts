import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Task } from './task.entity'; // Import Task entity

@Entity('deadline')
export class Deadline {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Task, { nullable: false })
  @JoinColumn({ name: 'taskId' })
  task: Task;

  @Column('timestamp')
  deadline: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
