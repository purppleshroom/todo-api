import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Project } from './project.entity';

export enum TaskStatus {
  CREATED,
  IN_PROGRESS,
  COMPLETED,
  OVERDUE,
  ARCHIVED,
}

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, (project) => project.id, { nullable: false })
  project: Project;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({
    type: 'int',
    enum: TaskStatus,
    default: TaskStatus.CREATED,
  })
  status: TaskStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
