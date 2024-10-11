import 'dotenv/config';
import { postgresDataSourceGenerator } from '../../../sources/postgres';

import { InitMigration1728685806448 } from '../1728685806448-init-migration';

export const dataSource = postgresDataSourceGenerator(
  {
    get: <T>(env: string) => process.env[env] as T | undefined,
    getOrThrow: <T>(env: string) => process.env[env] as T,
  },
  [InitMigration1728685806448],
);

dataSource.initialize();
