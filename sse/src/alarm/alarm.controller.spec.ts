import { Test, TestingModule } from '@nestjs/testing';
import { AlarmController } from './alarm.controller';

describe('AlarmController', () => {
  let controller: AlarmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlarmController],
    }).compile();

    controller = module.get<AlarmController>(AlarmController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
