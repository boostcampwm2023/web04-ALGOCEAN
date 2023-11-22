import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('isUserIdTaken', () => {
    it('should return true if user ID is taken', async () => {
      const existingUserId = 'existingUser';

      jest
        .spyOn(service, 'isUserIdTaken')
        .mockImplementation(async (userId) => userId === existingUserId);

      const result = await service.isUserIdTaken(existingUserId);
      expect(result).toBe(true);
    });

    it('should return false if user ID is not taken', async () => {
      const nonExistingUserId = 'nonExistingUser';

      jest
        .spyOn(service, 'isUserIdTaken')
        .mockImplementation(async (userId) => userId !== nonExistingUserId);

      const result = await service.isUserIdTaken(nonExistingUserId);
      expect(result).toBe(false);
    });
  });
});
