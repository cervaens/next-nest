import { Test, TestingModule } from '@nestjs/testing';
import { UserbalanceService } from './userbalance.service';

describe('UserbalanceService', () => {
  let service: UserbalanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserbalanceService],
    }).compile();

    service = module.get<UserbalanceService>(UserbalanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
