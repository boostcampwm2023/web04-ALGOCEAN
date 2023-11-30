import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLikesDto {
  @ApiProperty({
    example: 'question',
    description: '좋아요를 누를 대상의 타입',
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  @IsIn(['question', 'answer'])
  type: string;

  @ApiProperty({
    example: 1,
    description: '좋아요를 누를 대상의 id',
    type: 'number',
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
