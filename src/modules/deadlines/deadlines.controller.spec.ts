import { TestBed } from '@automock/jest';
import { DeadlinesController } from './deadlines.controller';
import { DeadlinesService } from './deadlines.service';

describe('DeadlinesController', () => {
  let controller: DeadlinesController;
  let service: jest.Mocked<DeadlinesService>;

  beforeEach(async () => {
    const { unit, unitRef } =
      await TestBed.create(DeadlinesController).compile();

    controller = unit;
    service = unitRef.get<DeadlinesService>(DeadlinesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
