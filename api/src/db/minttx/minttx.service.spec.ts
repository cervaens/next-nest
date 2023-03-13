import { Test, TestingModule } from '@nestjs/testing';
import { MinttxService } from './minttx.service';

describe('MinttxService', () => {
  let service: MinttxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MinttxService],
    }).compile();

    service = module.get<MinttxService>(MinttxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
