import { IsNotEmpty, IsUrl } from 'class-validator';
export class CreateAnswerDto {
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  @IsUrl()
  videoLink: string;
}
