import { Controller, Post, Body, Inject, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuth } from 'src/shared/auth/decorators/jwt-auth.decorator';
import { RequestUser } from 'src/shared/auth/jwt/decorators/request-user.decorator';
import { ROLES } from 'src/shared/constants';
import { IJwtData } from 'src/shared/interfaces/jwt-data.interface';
import { AUTHENTICATIONS_SERVICE_PROVIDER_KEY } from './contants';
import { RegisterDTO } from './dto/register.dto';
import { IAuthenticationsService } from './interfaces/authentications.service.interface';
import { LoginResponse } from './responses/login.response';

@ApiTags('auth')
@Controller('auth')
export class AuthenticationsController {
  constructor(
    @Inject(AUTHENTICATIONS_SERVICE_PROVIDER_KEY)
    private readonly authenticationsService: IAuthenticationsService,
  ) {}

  @ApiOkResponse({
    description: 'Login',
    type: LoginResponse,
  })
  @Post('/login')
  async login(
    @Body() { email, password }: RegisterDTO,
  ): Promise<LoginResponse> {
    return await this.authenticationsService.login(email, password);
  }

  @ApiOkResponse({
    description: 'Register Admin',
    type: LoginResponse,
  })
  @Post('/admins')
  async register(@Body() data: RegisterDTO): Promise<LoginResponse> {
    return await this.authenticationsService.register(data, [ROLES.ADMIN]);
  }
  @ApiOkResponse({
    description: 'Register Client',
    type: LoginResponse,
  })
  @Post('/clients')
  async registerClient(@Body() data: RegisterDTO): Promise<LoginResponse> {
    return await this.authenticationsService.register(data, [ROLES.CLIENT]);
  }

  @ApiOkResponse({
    description: 'Return the logged user',
    type: LoginResponse,
  })
  @JwtAuth([])
  @Get('/me')
  async me(@RequestUser() user: IJwtData): Promise<any> {
    return user;
  }
}
