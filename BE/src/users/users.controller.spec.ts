import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, PrismaService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('checkUserId', () => {
    it('should return { isTaken: true } if user ID is taken', async () => {
      const existingUserId = 'existingUser';
      jest
        .spyOn(service, 'isUserIdTaken')
        .mockImplementation(async (userId) => userId === existingUserId);

      const result = await controller.checkUserId(existingUserId);
      expect(result).toEqual({ isTaken: true });
    });

    it('should return { isTaken: false } if user ID is not taken', async () => {
      const nonExistingUserId = 'nonExistingUser';
      jest
        .spyOn(service, 'isUserIdTaken')
        .mockImplementation(async (userId) => userId !== nonExistingUserId);

      const result = await controller.checkUserId(nonExistingUserId);
      expect(result).toEqual({ isTaken: false });
    });
  });
});
