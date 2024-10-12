import 'dotenv/config';
import { postgresDataSourceGenerator } from '../../../sources/postgres';
import { InitMigration1728761951604 } from '../1728761951604-init-migration';

export const dataSource = postgresDataSourceGenerator(
  {
    get: <T>(env: string) => process.env[env] as T | undefined,
    getOrThrow: <T>(env: string) => process.env[env] as T,
  },
  [InitMigration1728761951604],
);

dataSource.initialize();
