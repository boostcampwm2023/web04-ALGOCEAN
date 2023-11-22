import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class UpdateQuestionDto {
  @IsNotEmpty()
  @IsString()
  title;

  @IsNotEmpty()
  @IsString()
  content;

  @IsNotEmpty()
  @IsString()
  tag;

  @IsNotEmpty()
  @IsString()
  programmingLanguage;

  @IsNotEmpty()
  @IsUrl()
  originalLink;
}
