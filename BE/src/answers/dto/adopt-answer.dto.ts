import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AdoptAnswerDto {
  @ApiProperty({
    example: 1,
    description: '채택하려는 답변의 id',
    type: 'number',
  })
  @IsNotEmpty()
  answerId: number;
}
