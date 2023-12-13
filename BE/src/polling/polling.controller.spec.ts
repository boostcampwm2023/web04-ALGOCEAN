import { Test, TestingModule } from '@nestjs/testing';
import { PollingController } from './polling.controller';

describe('PollingController', () => {
  let controller: PollingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PollingController],
    }).compile();

    controller = module.get<PollingController>(PollingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
