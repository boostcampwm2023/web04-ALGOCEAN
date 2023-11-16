import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class ReadQuestionListDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  nickname: string;

  @IsNotEmpty()
  @IsString()
  tag: string;

  @IsDate()
  createdAt: Date;

  @IsNotEmpty()
  @IsString()
  programmingLanguage: string;

  @IsBoolean()
  isAdopted: boolean;

  @IsNumber()
  viewCount: number;

  @IsNumber()
  likeCount: number;
}
