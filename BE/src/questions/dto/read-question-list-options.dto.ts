import { IsString, IsIn, Min, IsOptional, IsNumber } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class QuestionListOptionsDto {
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
    example: '1 또는 0 을 넣어야합니다 true or false가 아닙니다.',
    description: '질문의 채택 여부',
    type: Boolean,
  })
  @IsOptional()
  @Transform(({ value }) =>
    value === '1' ? true : value === '0' ? false : undefined,
  )
  isAdopted?: boolean;

  @ApiProperty({
    example: 'asc',
    description: '질문의 정렬 기준 by createdAt',
    type: String,
  })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortByCreatedAt?: 'asc' | 'desc' = 'desc';

  @ApiProperty({
    example: 'asc',
    description: '질문의 정렬 기준 by viewCount',
    type: String,
  })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortByViewCount?: 'asc' | 'desc';

  @ApiProperty({
    example: 'asc',
    description: '질문의 정렬 기준 by likeCount',
    type: String,
  })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortByLikeCount?: 'asc' | 'desc';

  @ApiProperty({
    example: 1,
    description: '질문리스트의 페이지 번호',
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiProperty({
    example: 'asc',
    description: '찾으려는 질문의 제목',
    type: String,
  })
  @IsOptional()
  @IsString()
  title?: string;
}
