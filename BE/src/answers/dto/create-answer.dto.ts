import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
export class CreateAnswerDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsUrl()
  videoLink: string;
}
