import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'user1',
    description: '유저 아이디',
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @ApiProperty({
    example: 'password1',
    description: '유저 비밀번호',
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({
    example: '겨울엔역시고구마',
    description: '유저 닉네임',
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  readonly nickname: string;
}
