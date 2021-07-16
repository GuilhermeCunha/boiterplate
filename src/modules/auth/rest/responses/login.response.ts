import { ApiProperty } from '@nestjs/swagger';
import { ILoggedUser } from '../../interfaces/logged-user.interface';

export class LoggedUserResponse implements ILoggedUser {
  @ApiProperty()
  jwtToken: string;

  @ApiProperty()
  user: any;
}
