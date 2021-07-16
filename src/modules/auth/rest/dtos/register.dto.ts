import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { IRegisterUser } from '../../interfaces/register-user.interface';

export class RegisterDTO implements IRegisterUser {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @Length(6, 14)
  password: string;
}
