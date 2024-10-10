import 'dotenv/config';
import { postgresDataSourceGenerator } from '../../../sources/postgres';

import { InitMigration1728562946928 } from '../1728562946928-init-migration';

export const dataSource = postgresDataSourceGenerator(
  {
    get: <T>(env: string) => process.env[env] as T,
  },
  [InitMigration1728562946928],
);

dataSource.initialize();
