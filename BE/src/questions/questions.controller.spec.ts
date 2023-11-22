import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsController } from './questions.controller';
import { PrismaService } from '../prisma.service';
import { QuestionsService } from './questions.service';
import { ReadQuestionListDto } from './dto/read-question-list.dto';

describe('QuestionsController', () => {
  let controller: QuestionsController;
  let service: QuestionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionsController],
      providers: [QuestionsService, PrismaService],
    }).compile();

    controller = module.get<QuestionsController>(QuestionsController);
    service = module.get<QuestionsService>(QuestionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getQuestionList', () => {
    it('should return a list of questions', async () => {
      const mockQuestionList: ReadQuestionListDto[] = [
        {
          id: 1,
          title: 'Question 1',
          nickname: 'name 1',
          tag: 'nestjs',
          isAdopted: false,
          likeCount: 0,
          viewCount: 0,
          createdAt: new Date(),
          programmingLanguage: 'JavaScript',
        },
        {
          id: 2,
          title: 'Question 2',
          nickname: 'name 2',
          tag: 'nestjs',
          isAdopted: false,
          likeCount: 0,
          viewCount: 0,
          createdAt: new Date(),
          programmingLanguage: 'JavaScript',
        },
      ];

      jest
        .spyOn(service, 'readQuestionList')
        .mockResolvedValue(mockQuestionList);

      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await controller.getQuestionList(
        {
          page: 1,
          isAdopted: false,
          programmingLanguage: 'JavaScript',
          tag: 'nestjs',
          sortByLikeCount: 'asc',
          sortByViewCount: 'desc',
          sortByCreatedAt: 'desc',
        },
        response as any, // Type casting for simplicity
      );

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith(mockQuestionList);
    });

    it('should handle internal server error', async () => {
      jest
        .spyOn(service, 'readQuestionList')
        .mockRejectedValue(new Error('Internal server error'));

      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await controller.getQuestionList({}, response as any);

      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.json).toHaveBeenCalledWith({
        error: 'Internal server error',
      });
    });
  });
});
