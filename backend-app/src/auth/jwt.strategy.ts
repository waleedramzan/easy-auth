import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { AUTH_MESSAGES } from 'src/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET')
    });
  }

  async validate(payload) {
    const { id } = payload;
    const user = await this.userModel.findById(id);
    if (!user) { throw new UnauthorizedException(AUTH_MESSAGES.LOGIN_TO_ACCESS)}
  }
}
