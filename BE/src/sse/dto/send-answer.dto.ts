import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendAnswerDto {
  @ApiProperty({
    example: 1,
    description: '질문의 ID',
    type: Number,
  })
  @IsNumber()
  questionId: number;

  @ApiProperty({
    example: '다익스트라 알고리즘의 정당성이 궁금해요',
    description: '질문의 제목',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  questionTitle: string;

  @ApiProperty({
    example: 1,
    description: '답변의 ID',
    type: Number,
  })
  @IsNumber()
  answerId: number;

  @ApiProperty({
    example: '2023-11-21T18:45:37.000Z',
    description: '답변의 생성 시간',
    type: Date,
  })
  @IsDate()
  answerCreatedDate: Date;
}
