import { IsString, IsIn, Min, IsOptional, IsNumber } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class QuestionListOptionsDto {
  @IsOptional()
  @IsString()
  tag?: string;

  @IsOptional()
  @IsString()
  programmingLanguage?: string;

  @IsOptional()
  @Transform(({ value }) =>
    value === '1' ? true : value === '0' ? false : undefined,
  )
  isAdopted?: boolean;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortByCreatedAt?: 'asc' | 'desc' = 'desc';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortByViewCount?: 'asc' | 'desc';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortByLikeCount?: 'asc' | 'desc';

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;
}
