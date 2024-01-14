import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { LoginValidation } from './validations/login.validations';
import { SignUpValidation } from './validations/signup.validations';
import { AUTH_MESSAGES } from 'src/constants';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async signUp(
    @Body() body: SignUpValidation,
    @Res() res: Response,
  ) {
    await this.authService.signUp(body);
    return res.send({ message: AUTH_MESSAGES.USER_REGISTERED_SUCCESS });
  }

  @Post('/login')
  async login(
    @Body() body: LoginValidation,
    @Res() res: Response,
  ) {
    const token = await this.authService.login(body);
    return res.status(200).send({ message: AUTH_MESSAGES.LOGIN_SUCCESS, token: `Bearer ${token.token}` });
  }

  @Post('logout')
  async logout(
    @Req() req: Request,
    @Res() res: Response
  ) {
    return res.send({ message: AUTH_MESSAGES.LOGOUT_SUCCESS });
  }
}
