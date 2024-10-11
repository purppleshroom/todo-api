import { normalize } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from '../projects/projects.module';
import { AuthModule } from '../auth/auth.module';
import { TasksModule } from '../tasks/tasks.module';
import { CategoriesModule } from '../categories/categories.module';
import { DeadlinesModule } from '../deadlines/deadlines.module';
import { RemindersModule } from '../reminders/reminders.module';

import { postgresDataSourceGenerator } from '../../db/sources/postgres';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => [
        {
          rootPath: normalize(
            configService.getOrThrow<string>('CLIENT_ROOT_PATH'),
          ),
          renderPath: '/client*',
        },
      ],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        postgresDataSourceGenerator(configService).options,
    }),
    ProjectsModule,
    AuthModule,
    TasksModule,
    CategoriesModule,
    DeadlinesModule,
    RemindersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
