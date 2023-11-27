import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
} from 'class-validator';

export class ReadQuestionDto {
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
  content: string;

  @IsNotEmpty()
  @IsString()
  tag: string;

  @IsNotEmpty()
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

  @IsBoolean()
  isLiked: boolean;

  @IsUrl()
  originalLink: string;
}
