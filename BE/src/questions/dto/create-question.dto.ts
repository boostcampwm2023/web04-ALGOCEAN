// { title, content, tag, programmingLanguage, originalLink }
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  tag: string;

  @IsNotEmpty()
  @IsString()
  programmingLanguage: string;

  @IsNotEmpty()
  @IsUrl()
  originalLink: string;

  @IsOptional()
  @IsNumber()
  draftId: number;
}
