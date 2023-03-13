import { Test, TestingModule } from '@nestjs/testing';
import { UserhistoryService } from './userhistory.service';

describe('UserhistoryService', () => {
  let service: UserhistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserhistoryService],
    }).compile();

    service = module.get<UserhistoryService>(UserhistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
