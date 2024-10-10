import 'reflect-metadata';
import { DataSource, MixedList } from 'typeorm';

import { User } from '../entities/user.entity';
import { Project } from '../entities/project.entity';
import { Task } from '../entities/task.entity';
import { Category } from '../entities/category.entity';
import { TaskCategory } from '../entities/task-category.entity';
import { Deadline } from '../entities/deadline.entity';
import { Reminder } from '../entities/reminder.entity';
import { AccessToken } from '../entities/access-token.entity';
import { RefreshToken } from '../entities/refresh-token.entity';
import { ConfirmationToken } from '../entities/confirmation-token.entity';

interface ConfigService {
  get: <T>(env: string) => T;
}

export const postgresDataSourceGenerator = (
  configService: ConfigService,
  // eslint-disable-next-line @typescript-eslint/ban-types
  migrations?: MixedList<string | Function>,
  // eslint-disable-next-line @typescript-eslint/ban-types
  subscribers?: MixedList<string | Function>,
) =>
  new DataSource({
    type: 'postgres',
    host: configService.get<string>('POSTGRES_HOST'),
    port: configService.get<number>('POSTGRES_PORT'),
    username: configService.get<string>('POSTGRES_USER'),
    password: configService.get<string>('POSTGRES_PASSWORD'),
    database: configService.get<string>('POSTGRES_DB'),
    entities: [
      User,
      Project,
      Task,
      Category,
      TaskCategory,
      Deadline,
      Reminder,
      AccessToken,
      RefreshToken,
      ConfirmationToken,
    ],
    migrations,
    subscribers,
  });
