import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @ApiProperty({
    example: 'user1',
    description: '유저 아이디',
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({
    example: 'password1',
    description: '유저 비밀번호',
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
