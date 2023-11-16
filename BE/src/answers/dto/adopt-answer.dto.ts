import { IsNotEmpty } from 'class-validator';

export class AdoptAnswerDto {
  @IsNotEmpty()
  answerId: number;
}
