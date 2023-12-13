import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SendAnswerDto {
  @IsNumber()
  questionId: number;

  @IsNotEmpty()
  @IsString()
  questionTitle: string;

  @IsNumber()
  answerId: number;

  @IsDate()
  answerCreatedDate: Date;
}
