import { Test, TestingModule } from '@nestjs/testing';
import { AlarmService } from './alarm.service';

describe('AlarmService', () => {
  let service: AlarmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlarmService],
    }).compile();

    service = module.get<AlarmService>(AlarmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
