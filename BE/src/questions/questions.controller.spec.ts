import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsController } from './questions.controller';
import { PrismaService } from '../prisma.service';
import { QuestionsService } from './questions.service';
import { ReadQuestionListDto } from './dto/read-question-list.dto';
import { HttpStatus } from '@nestjs/common';

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

      expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
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

      expect(response.status).toHaveBeenCalledWith(
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      expect(response.json).toHaveBeenCalledWith({
        error: 'Internal server error',
      });
    });
  });

  describe('createDraft', () => {
    it('should create a draft', async () => {
      const mockDraftId = 1;
      jest
        .spyOn(service, 'createOneQuestionDraft')
        .mockResolvedValue(mockDraftId);

      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await controller.createDraft(response as any);

      expect(response.status).toHaveBeenCalledWith(HttpStatus.CREATED);
      expect(response.json).toHaveBeenCalledWith({
        message: 'Draft created successfully',
        id: mockDraftId,
      });
    });
  });

  describe('updateDraft', () => {
    it('should update a draft', async () => {
      const mockDraftId = 1;
      jest.spyOn(service, 'updateOneQuestionDraft').mockResolvedValue();

      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await controller.updateDraft(mockDraftId, {}, response as any);

      expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(response.json).toHaveBeenCalledWith({
        message: 'Draft updated successfully',
      });
    });
  });

  describe('deleteDraft', () => {
    it('should delete a draft', async () => {
      const mockDraftId = 1;
      jest.spyOn(service, 'deleteOneQuestionDraft').mockResolvedValue();

      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await controller.deleteDraft(mockDraftId, response as any);

      expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(response.json).toHaveBeenCalledWith({
        message: 'Draft deleted successfully',
      });
    });
  });
});
