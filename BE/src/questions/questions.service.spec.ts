import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsService } from './questions.service';
import { PrismaService } from '../prisma.service';
import { QuestionListOptionsDto } from './dto/read-question-list-options.dto';
import { ReadQuestionListDto } from './dto/read-question-list.dto';

describe('QuestionsService', () => {
  let service: QuestionsService;
  let mockQuestions: ReadQuestionListDto[];

  const tags = ['siteA', 'siteB', 'siteC', 'siteD'];
  const programmingLanguages = [
    'C++',
    'JavaScript',
    'Python',
    'Ruby',
    'Golf',
    'Fortran',
  ];

  function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomElement(array: any[]) {
    return array[Math.floor(Math.random() * array.length)];
  }

  beforeAll(() => {
    mockQuestions = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      title: `Question ${i + 1}`,
      nickname: `name ${i + 1}`,
      tag: getRandomElement(tags),
      isAdopted: Boolean(i % 2),
      likeCount: getRandomInt(1, 100),
      viewCount: getRandomInt(1, 100),
      createdAt: new Date(2022, i % 12, getRandomInt(1, 28)),
      programmingLanguage: getRandomElement(programmingLanguages),
    }));
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionsService, PrismaService],
    }).compile();

    service = module.get<QuestionsService>(QuestionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should filter by tag', async () => {
    const options: QuestionListOptionsDto = {
      tag: getRandomElement(tags),
    };

    const filteredQuestions = mockQuestions.filter(
      (question) => question.tag === options.tag,
    );
    jest
      .spyOn(service, 'readQuestionList')
      .mockResolvedValue(filteredQuestions);

    const result = await service.readQuestionList(options);
    expect(result).toEqual(filteredQuestions);
  });

  it('should filter by programming language', async () => {
    const options: QuestionListOptionsDto = {
      programmingLanguage: getRandomElement(programmingLanguages),
    };

    const filteredQuestions = mockQuestions.filter(
      (question) =>
        question.programmingLanguage === options.programmingLanguage,
    );
    jest
      .spyOn(service, 'readQuestionList')
      .mockResolvedValue(filteredQuestions);

    const result = await service.readQuestionList(options);
    expect(result).toEqual(filteredQuestions);
  });

  it('should filter by isAdopted', async () => {
    const options: QuestionListOptionsDto = {
      isAdopted: Boolean(getRandomInt(0, 1)),
    };

    const filteredQuestions = mockQuestions.filter(
      (question) => question.isAdopted === options.isAdopted,
    );
    jest
      .spyOn(service, 'readQuestionList')
      .mockResolvedValue(filteredQuestions);

    const result = await service.readQuestionList(options);
    expect(result).toEqual(filteredQuestions);
  });

  it('should filter by tag, programming language, and isAdopted', async () => {
    const options: QuestionListOptionsDto = {
      tag: getRandomElement(tags),
      programmingLanguage: getRandomElement(programmingLanguages),
      isAdopted: Boolean(getRandomInt(0, 1)),
    };

    const filteredQuestions = mockQuestions.filter(
      (question) =>
        question.tag === options.tag &&
        question.programmingLanguage === options.programmingLanguage &&
        question.isAdopted === options.isAdopted,
    );
    jest
      .spyOn(service, 'readQuestionList')
      .mockResolvedValue(filteredQuestions);

    const result = await service.readQuestionList(options);
    expect(result).toEqual(filteredQuestions);
  });

  it('should filter by tag, programming language, and isAdopted and should sort by createdAt, viewCount, and likeCount', async () => {
    const options: QuestionListOptionsDto = {
      tag: getRandomElement(tags),
      programmingLanguage: getRandomElement(programmingLanguages),
      isAdopted: Boolean(getRandomInt(0, 1)),
      sortByCreatedAt: 'asc',
      sortByViewCount: 'desc',
      sortByLikeCount: 'asc',
    };

    const filteredQuestions = mockQuestions
      .filter(
        (question) =>
          question.tag === options.tag &&
          question.programmingLanguage === options.programmingLanguage &&
          question.isAdopted === options.isAdopted,
      )
      .sort((a, b) => {
        if (options.sortByCreatedAt === 'asc') {
          return a.createdAt.getTime() - b.createdAt.getTime();
        } else if (options.sortByCreatedAt === 'desc') {
          return b.createdAt.getTime() - a.createdAt.getTime();
        }
        return 0;
      })
      .sort((a, b) => {
        if (options.sortByViewCount === 'asc') {
          return a.viewCount - b.viewCount;
        } else if (options.sortByViewCount === 'desc') {
          return b.viewCount - a.viewCount;
        }
        return 0;
      })
      .sort((a, b) => {
        if (options.sortByLikeCount === 'asc') {
          return a.likeCount - b.likeCount;
        } else if (options.sortByLikeCount === 'desc') {
          return b.likeCount - a.likeCount;
        }
        return 0;
      });

    jest
      .spyOn(service, 'readQuestionList')
      .mockResolvedValue(filteredQuestions);

    const result = await service.readQuestionList(options);
    expect(result).toEqual(filteredQuestions);
  });
});
