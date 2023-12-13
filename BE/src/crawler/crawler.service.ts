import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class CrawlerService {
  async scrape(url: string): Promise<any[]> {
    const headers = {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) ' +
        'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
    };
    const { data } = await axios.get(url, { headers });
    const $ = cheerio.load(data);
    const title = $('.page-header h3').text().trim();
    const link = $('.page-header blockquote a').attr('href');

    const result = [];

    result.push({
      title,
      link: 'https://www.acmicpc.net' + link,
    });

    // 수집 함수
    const collectInfo = (commentElement) => {
      const userId = commentElement
        .find('.panel-heading .panel-title a')
        .first()
        .text()
        .trim();
      const timestamp = commentElement
        .find('.panel-heading .panel-title a')
        .eq(1)
        .attr('data-timestamp');

      // content를 .content 또는 .content.post에서 가져오도록 수정
      const contentParent = commentElement.find('.panel-body .content-parent');
      const content = contentParent.find('.content').length
        ? contentParent.find('.content')
        : commentElement.find('.panel-body .content.post');

      const codeMirrorTextarea = commentElement.find(
        '.source.CodeMirror-readonly textarea.form-control.no-mathjax.codemirror-textarea',
      );
      const codeMirrorValue = codeMirrorTextarea.text();

      result.push({
        userId,
        timestamp,
        contentPostText: content.html(),
        codeMirrorValue,
      });
    };

    // 질문 정보 수집
    collectInfo($('.col-md-12.comment').first());

    // 답변 정보 수집
    const answerComments = $('.col-md-12.comment').slice(1);
    if (answerComments.length > 0) {
      answerComments.each((index, element) => {
        collectInfo($(element));
      });
    }
    return result;
  }

  async scrapeList(url: string): Promise<any[]> {
    const headers = {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) ' +
        'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
    };
    const { data } = await axios.get(url, { headers });
    const $ = cheerio.load(data);

    const result = [];

    // tr 태그 중 class가 success인 것을 제외한 나머지 tr 태그들을 선택
    const trElements = $('.table tbody tr:not(.success)');
    trElements.each((index, element) => {
      const tdElements = $(element).find('td');

      // a 태그를 통해 href 값 가져오기
      const link = $(tdElements[0]).find('a').attr('href');

      // 중간에 있는 태그를 통해 프로그래밍 언어 정보 가져오기
      const programmingLanguage = $(tdElements[2]).text().trim() ?? 'None';

      result.push({
        link,
        programmingLanguage,
      });
    });

    return result;
  }
}
