import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateAnswerDto {
  @ApiProperty({
    example: '이것은 답변입니다',
    description: '답변 내용',
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    example: 'https://www.youtube.com',
    description: '답변에 첨부할 동영상 링크',
    type: 'string',
  })
  @IsNotEmpty()
  @IsUrl()
  videoLink: string;
}
