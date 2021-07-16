import { Controller, Post, Body, Inject, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuth } from 'src/shared/auth/decorators/jwt-auth.decorator';
import { RequestUser } from 'src/shared/auth/jwt/decorators/request-user.decorator';
import { ROLES } from 'src/shared/constants';
import { IJwtData } from 'src/shared/interfaces/jwt-data.interface';
import { AUTHENTICATIONS_SERVICE_PROVIDER_KEY } from '../constants';
import { LoginDTO } from './dtos/login.dto';
import { RegisterDTO } from './dtos/register.dto';
import { IAuthenticationsService } from '../interfaces/authentications.service.interface';
import { LoggedUserResponse } from './responses/login.response';

@ApiTags('auth')
@Controller('auth')
export class AuthenticationsController {
  constructor(
    @Inject(AUTHENTICATIONS_SERVICE_PROVIDER_KEY)
    private readonly authenticationsService: IAuthenticationsService,
  ) {}

  @ApiOkResponse({
    description: 'Login',
    type: LoggedUserResponse,
  })
  @Post('/login')
  async login(
    @Body() { email, password }: LoginDTO,
  ): Promise<LoggedUserResponse> {
    return await this.authenticationsService.loginWithEmailAndPassword(
      email,
      password,
    );
  }

  @ApiOkResponse({
    description: 'Register Admin',
    type: LoggedUserResponse,
  })
  @Post('/admins')
  async register(@Body() data: RegisterDTO): Promise<LoggedUserResponse> {
    return await this.authenticationsService.register(data, [ROLES.ADMIN]);
  }
  @ApiOkResponse({
    description: 'Register Client',
    type: LoggedUserResponse,
  })
  @Post('/clients')
  async registerClient(@Body() data: RegisterDTO): Promise<LoggedUserResponse> {
    return await this.authenticationsService.register(data, [ROLES.CLIENT]);
  }

  @ApiOkResponse({
    description: 'Return the logged user',
    type: LoggedUserResponse,
  })
  @JwtAuth([])
  @Get('/me')
  async me(@RequestUser() user: IJwtData): Promise<any> {
    return user;
  }
}
