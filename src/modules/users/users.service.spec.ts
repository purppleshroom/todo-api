/* eslint-disable @typescript-eslint/no-unused-vars */
import { TestBed } from '@automock/jest';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from 'src/db/entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const { unit, unitRef } = await TestBed.create(UsersService).compile();

    service = unit;
    userRepository = unitRef.get<Repository<User>>('UserRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
