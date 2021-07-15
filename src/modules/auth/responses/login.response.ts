import { ApiProperty } from '@nestjs/swagger';
import { ILoggedUser } from '../interfaces/logged-user.interface';

export class LoginResponse implements ILoggedUser {
  @ApiProperty()
  jwtToken: string;

  @ApiProperty()
  user: any;
}
