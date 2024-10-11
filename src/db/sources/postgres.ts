import 'reflect-metadata';
import { DataSource, MixedList } from 'typeorm';

import { User } from '../entities/user.entity';
import { Project } from '../entities/project.entity';
import { Task } from '../entities/task.entity';
import { Category } from '../entities/category.entity';
import { Deadline } from '../entities/deadline.entity';
import { Reminder } from '../entities/reminder.entity';
import { RefreshToken } from '../entities/refresh-token.entity';
import { ConfirmationToken } from '../entities/confirmation-token.entity';

interface ConfigService {
  get: <T>(env: string) => T | undefined;
  getOrThrow: <T>(env: string) => T;
}

export const postgresDataSourceGenerator = (
  configService: ConfigService,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  migrations?: MixedList<string | Function>,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  subscribers?: MixedList<string | Function>,
) =>
  new DataSource({
    type: 'postgres',
    host: configService.getOrThrow<string>('POSTGRES_HOST'),
    port: configService.getOrThrow<number>('POSTGRES_PORT'),
    username: configService.getOrThrow<string>('POSTGRES_USER'),
    password: configService.getOrThrow<string>('POSTGRES_PASSWORD'),
    database: configService.getOrThrow<string>('POSTGRES_DB'),
    entities: [
      User,
      Project,
      Task,
      Category,
      Deadline,
      Reminder,
      RefreshToken,
      ConfirmationToken,
    ],
    migrations,
    subscribers,
  });
