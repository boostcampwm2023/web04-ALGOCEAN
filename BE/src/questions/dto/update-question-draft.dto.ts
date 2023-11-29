import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateQuestionDraftDto {
  @ApiProperty({
    example: '다익스트라 알고리즘의 정당성이 궁금해요',
    description: '질문의 제목',
    type: String,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    example:
      '다익스트라 알고리즘으로 선택된 노드는 최소 비용이 계산 되었을 때이며 알고리즘을 더 진행한다고 해도 계산된 노드는 선택되지 않는다 라는 말이 이해가 안가요',
    description: '질문의 내용',
    type: String,
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({
    example: 'Baekjoon',
    description: '질문의 태그',
    type: String,
  })
  @IsOptional()
  @IsString()
  tag?: string;

  @ApiProperty({
    example: 'C++',
    description: '질문의 프로그래밍 언어',
    type: String,
  })
  @IsOptional()
  @IsString()
  programmingLanguage?: string;

  @ApiProperty({
    example: 'https://www.acmicpc.net/problem/1753',
    description: '질문의 원본 링크',
    type: String,
  })
  @IsOptional()
  @IsString()
  originalLink?: string;
}
