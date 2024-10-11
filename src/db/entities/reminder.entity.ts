import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Task } from './task.entity';

@Entity('reminder')
export class Reminder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Task, { nullable: false })
  @JoinColumn({ name: 'taskId' })
  task: Task;

  @Column('timestamp')
  reminder: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
