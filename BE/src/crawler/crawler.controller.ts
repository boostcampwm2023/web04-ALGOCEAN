import { Controller, Get } from '@nestjs/common';
import { CrawlerService } from './crawler.service';
import { PrismaService } from '../prisma.service';

@Controller('crawler')
export class CrawlerController {
  constructor(
    private readonly crawlerService: CrawlerService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  async getPost(url) {
    return this.crawlerService.scrape(url);
  }

  @Get('list')
  async getPostList() {
    const url = 'https://www.acmicpc.net/board/list/question/555';
    const list = await this.crawlerService.scrapeList(url);
    const prefix = 'https://www.acmicpc.net';
    const result = list.map((item) => {
      return {
        link: prefix + item.link,
        programmingLanguage: item.programmingLanguage,
      };
    });

    const postList = [];
    for (let i = 0; i < result.length; i++) {
      const post = await this.crawlerService.scrape(result[i].link);
      postList.push({
        post,
        programmingLanguage: result[i].programmingLanguage,
      });
    }
    return postList;
  }

  @Get('save')
  async saveQuestion() {
    const postList: any = await this.getPostList();
    try {
      for (let i = 0; i < postList.length; i++) {
        const { title, link } = postList[i].post[0]; // postList[i].post[0]은 질문에 대한 정보

        // const { userId, timestamp, contentPostText, codeMirrorValue } =
        const { timestamp, contentPostText, codeMirrorValue } =
          postList[i].post[1]; // postList[i].post[1]은 답변에 대한 정보

        const isoTimestamp = new Date(
          parseInt(timestamp, 10) * 1000,
        ).toISOString();

        const formattedCodeMirrorValue = codeMirrorValue
          .split('\n')
          .map((line) => {
            return `<p>${line}</p>`;
          })
          .join('\n');

        const content = `${contentPostText}\n${formattedCodeMirrorValue}`;
        const question = await this.prismaService.question.create({
          data: {
            UserId: 1,
            Title: title,
            Content: content,
            Tag: 'baekjoon',
            ProgrammingLanguage: postList[i].programmingLanguage,
            OriginalLink: link,
            CreatedAt: isoTimestamp,
          },
        });

        for (let j = 2; j < postList[i].post.length; j++) {
          // const { userId, timestamp, contentPostText, codeMirrorValue } =
          const { timestamp, contentPostText, codeMirrorValue } =
            postList[i].post[j];

          const isoTimestamp = new Date(
            parseInt(timestamp, 10) * 1000,
          ).toISOString();

          const formattedCodeMirrorValue = codeMirrorValue
            .split('\n')
            .map((line) => {
              return `<p>${line}</p>`;
            })
            .join('\n');
          const content = `${contentPostText}\n${formattedCodeMirrorValue}`;

          await this.prismaService.answer.create({
            data: {
              UserId: 1,
              QuestionId: question.Id,
              Content: content,
              CreatedAt: isoTimestamp,
            },
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}
