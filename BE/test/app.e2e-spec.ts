import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';

describe('UserController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );
    app.enableCors();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/users/register (POST)', () => {
    return request(app.getHttpServer())
      .post('/users/register')
      .send({
        userId: 'test',
        password: 'test',
        nickname: 'test',
      })
      .expect(201);
  });

  it('/users/check/:userId (GET)', () => {
    return request(app.getHttpServer())
      .get('/users/check/test')
      .expect(200)
      .expect({ isDuplicated: true });
  });

  it('/users/points/:userId (GET)', () => {
    return request(app.getHttpServer())
      .get('/users/points/test')
      .expect(200)
      .expect('0');
  });

  it('/users/nickname/:userId (GET)', () => {
    return request(app.getHttpServer())
      .get('/users/nickname/test')
      .expect(200)
      .expect('test');
  });

  it('/users/grade/:userId (GET)', () => {
    return request(app.getHttpServer())
      .get('/users/grade/test')
      .expect(200)
      .expect('Platinum');
  });

  afterAll(async () => {
    await app.close();
  });
});

describe('QuestionController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );
    app.enableCors();
    await app.init();
  });

  it('/questions/drafts (POST)', () => {
    return request(app.getHttpServer()).post('/questions/drafts').expect(201);
  });

  it('/questions/drafts (PUT)', () => {
    return request(app.getHttpServer()).put('/questions/drafts/1').send({
      title: 'title',
      content: 'content',
      tag: 'tag',
      programmingLanguage: 'programmingLanguage',
      originalLink: 'https://www.acmicpc.net/problem/1753',
    });
  });

  it('/questions/drafts (GET)', () => {
    return request(app.getHttpServer())
      .get('/questions/drafts')
      .expect(200)
      .expect({
        title: 'title',
        content: 'content',
        tag: 'tag',
        programmingLanguage: 'programmingLanguage',
        originalLink: 'https://www.acmicpc.net/problem/1753',
      });
  });

  it('/questions/drafts/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/questions/drafts/1')
      .expect(200);
  });

  it('/questions/drafts (POST)', () => {
    return request(app.getHttpServer()).post('/questions/drafts').expect(201);
  });

  it('/questions (POST)', () => {
    return request(app.getHttpServer())
      .post('/questions')
      .send({
        title: 'title',
        content: 'content',
        tag: 'tag',
        programmingLanguage: 'programmingLanguage',
        originalLink: 'https://www.acmicpc.net/problem/1753',
        draftId: 2,
      })
      .expect(201)
      .expect({
        message: 'Question created successfully',
        id: 1,
      });
  });

  it('/questions/lists (GET)', () => {
    const createdAtRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

    return request(app.getHttpServer())
      .get('/questions/lists')
      .expect(200)
      .expect((response) => {
        const question = response.body.questions[0];
        expect(question.id).toBe(1);
        expect(question.title).toBe('title');
        expect(question.nickname).toBe('test');
        expect(question.tag).toBe('tag');
        expect(createdAtRegex.test(question.createdAt)).toBe(true);
        expect(question.programmingLanguage).toBe('programmingLanguage');
        expect(question.isAdopted).toBe(false);
        expect(question.viewCount).toBe(0);
        expect(question.likeCount).toBe(0);
        const totalPage = response.body.totalPage;
        expect(totalPage).toBe(1);
      });
  });

  it('/questions (GET)', () => {
    const createdAtRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    return request(app.getHttpServer())
      .get('/questions/1')
      .expect(200)
      .expect((response) => {
        const question = response.body;
        expect(question.id).toBe(1);
        expect(question.title).toBe('title');
        expect(question.nickname).toBe('test');
        expect(question.content).toBe('content');
        expect(question.tag).toBe('tag');
        expect(createdAtRegex.test(question.createdAt)).toBe(true);
        expect(question.programmingLanguage).toBe('programmingLanguage');
        expect(question.originalLink).toBe(
          'https://www.acmicpc.net/problem/1753',
        );
        expect(question.isAdopted).toBe(false);
        expect(question.viewCount).toBe(0);
        expect(question.likeCount).toBe(0);
        expect(question.isLiked).toBe(false);
      });
  });

  it('/questions (PUT)', () => {
    return request(app.getHttpServer())
      .put('/questions/1')
      .send({
        title: 'title',
        content: 'content',
        tag: 'tag',
        programmingLanguage: 'programmingLanguage',
        originalLink: 'https://www.acmicpc.net/problem/1753',
      })
      .expect(200)
      .expect({ message: 'Question updated successfully' });
  });

  it('/questions (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/questions/1')
      .expect(200)
      .expect({ message: 'Question deleted successfully' });
  });
});

describe('AnswerController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );
    app.enableCors();
    await app.init();
  });

  it('/questions/drafts (POST)', () => {
    return request(app.getHttpServer()).post('/questions/drafts').expect(201);
  });

  it('questions (POST)', () => {
    return request(app.getHttpServer())
      .post('/questions')
      .send({
        title: 'title',
        content: 'content',
        tag: 'tag',
        programmingLanguage: 'programmingLanguage',
        originalLink: 'https://www.acmicpc.net/problem/1753',
        draftId: 3,
      })
      .expect(201)
      .expect({
        message: 'Question created successfully',
        id: 2,
      });
  });

  it('/answers (POST)', () => {
    return request(app.getHttpServer())
      .post('/answers')
      .send({
        questionId: 2,
        content: 'content',
        videoLink: 'https://www.youtube.com',
      })
      .expect(201)
      .expect({ message: 'Answer created successfully' });
  });

  it('/answers/adopt (POST)', () => {
    return request(app.getHttpServer())
      .post('/answers/adopt')
      .send({
        answerId: 1,
      })
      .expect(200)
      .expect({ message: 'Answer adopted' });
  });

  it('/answers/:questionId (GET)', () => {
    const createdAtRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    return request(app.getHttpServer())
      .get('/answers/2')
      .expect(200)
      .expect((response) => {
        const answer = response.body.answers[0];
        expect(answer.id).toBe(1);
        expect(answer.user.nickname).toBe('test');
        expect(answer.user.profileImage).toBe(null);
        expect(answer.content).toBe('content');
        expect(answer.videoLink).toBe('https://www.youtube.com');
        expect(answer.isAdopted).toBe(true);
        expect(createdAtRegex.test(answer.createdAt)).toBe(true);
      });
  });

  it('/questions/:questionId (GET)', () => {
    const createdAtRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    return request(app.getHttpServer())
      .get('/questions/2')
      .expect(200)
      .expect((response) => {
        const question = response.body;
        expect(question.id).toBe(2);
        expect(question.title).toBe('title');
        expect(question.nickname).toBe('test');
        expect(question.content).toBe('content');
        expect(question.tag).toBe('tag');
        expect(createdAtRegex.test(question.createdAt)).toBe(true);
        expect(question.programmingLanguage).toBe('programmingLanguage');
        expect(question.originalLink).toBe(
          'https://www.acmicpc.net/problem/1753',
        );
        expect(question.isAdopted).toBe(true);
        expect(question.viewCount).toBe(0);
        expect(question.likeCount).toBe(0);
        expect(question.isLiked).toBe(false);
      });
  });

  it('/users/points/:userId (GET)', () => {
    return request(app.getHttpServer())
      .get('/users/points/test')
      .expect(200)
      .expect('22');
  });
});

describe('LikeController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );
    app.enableCors();
    await app.init();
  });

  it('/questions/drafts (POST)', () => {
    return request(app.getHttpServer()).post('/questions/drafts').expect(201);
  });

  it('/questions (POST)', () => {
    return request(app.getHttpServer())
      .post('/questions')
      .send({
        title: 'title',
        content: 'content',
        tag: 'tag',
        programmingLanguage: 'programmingLanguage',
        originalLink: 'https://www.acmicpc.net/problem/1753',
        draftId: 4,
      })
      .expect(201)
      .expect({
        message: 'Question created successfully',
        id: 3,
      });
  });

  it('/likes (POST)', () => {
    return request(app.getHttpServer())
      .post('/likes')
      .send({
        id: 3,
        type: 'question',
      })
      .expect(201)
      .expect({ liked: 1 });
  });

  it('/questions/:questionId (GET)', () => {
    const createdAtRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    return request(app.getHttpServer())
      .get('/questions/3')
      .expect(200)
      .expect((response) => {
        const question = response.body;
        expect(question.id).toBe(3);
        expect(question.title).toBe('title');
        expect(question.nickname).toBe('test');
        expect(question.content).toBe('content');
        expect(question.tag).toBe('tag');
        expect(createdAtRegex.test(question.createdAt)).toBe(true);
        expect(question.programmingLanguage).toBe('programmingLanguage');
        expect(question.originalLink).toBe(
          'https://www.acmicpc.net/problem/1753',
        );
        expect(question.isAdopted).toBe(false);
        expect(question.viewCount).toBe(0);
        expect(question.likeCount).toBe(1);
        expect(question.isLiked).toBe(true);
      });
  });

  it('/likes (POST)', () => {
    return request(app.getHttpServer())
      .post('/likes')
      .send({
        id: 3,
        type: 'question',
      })
      .expect(201)
      .expect({ liked: 0 });
  });

  it('/questions/:questionId (GET)', () => {
    const createdAtRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    return request(app.getHttpServer())
      .get('/questions/3')
      .expect(200)
      .expect((response) => {
        const question = response.body;
        expect(question.id).toBe(3);
        expect(question.title).toBe('title');
        expect(question.nickname).toBe('test');
        expect(question.content).toBe('content');
        expect(question.tag).toBe('tag');
        expect(createdAtRegex.test(question.createdAt)).toBe(true);
        expect(question.programmingLanguage).toBe('programmingLanguage');
        expect(question.originalLink).toBe(
          'https://www.acmicpc.net/problem/1753',
        );
        expect(question.isAdopted).toBe(false);
        expect(question.viewCount).toBe(1);
        expect(question.likeCount).toBe(0);
        expect(question.isLiked).toBe(false);
      });
  });
});
