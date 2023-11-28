import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLikesDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(['question', 'answer'])
  type: string;

  @IsNotEmpty()
  @IsNumber()
  id: number;
}
