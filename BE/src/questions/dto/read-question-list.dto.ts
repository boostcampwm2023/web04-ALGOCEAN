import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReadQuestionListDto {
  @ApiProperty({
    example: 1,
    description: '질문의 ID',
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    example: '다익스트라 알고리즘의 정당성이 궁금해요',
    description: '질문의 제목',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: '고구마',
    description: '질문의 작성자',
  })
  @IsNotEmpty()
  @IsString()
  nickname: string;

  @ApiProperty({
    example: 'Baekjoon',
    description: '질문의 태그',
  })
  @IsNotEmpty()
  @IsString()
  tag: string;

  @ApiProperty({
    example: '2023-11-21T18:45:37.000Z',
    description: '질문의 생성 시간',
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    example: 'C++',
    description: '질문의 프로그래밍 언어',
  })
  @IsNotEmpty()
  @IsString()
  programmingLanguage: string;

  @ApiProperty({
    example: 'true',
    description: '질문의 채택 여부',
  })
  @IsBoolean()
  isAdopted: boolean;

  @ApiProperty({
    example: 1,
    description: '질문의 조회수',
  })
  @IsNumber()
  viewCount: number;

  @ApiProperty({
    example: 1,
    description: '질문의 좋아요 수',
  })
  @IsNumber()
  likeCount: number;
}
