import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { Task } from './task.entity';
import { Category } from './category.entity';

@Entity('task_categories')
export class TaskCategory {
  @PrimaryColumn()
  taskId: number;

  @PrimaryColumn()
  categoryId: number;

  @ManyToOne(() => Task, (task) => task.id, { onDelete: 'CASCADE' })
  task: Task;

  @ManyToOne(() => Category, (category) => category.id, { onDelete: 'CASCADE' })
  category: Category;
}
