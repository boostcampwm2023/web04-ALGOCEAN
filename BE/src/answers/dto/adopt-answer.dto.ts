import { IsNotEmpty } from 'class-validator';

export class AdoptAnswerDto {
  @IsNotEmpty()
  questionId: number;

  @IsNotEmpty()
  answerId: number;
}
