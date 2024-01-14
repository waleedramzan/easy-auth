import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { LoginValidation } from './validations/login.validations';
import { SignUpValidation } from './validations/signup.validations';
import { User } from './schemas/user.schema';
import { AUTH_MESSAGES } from 'src/constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(postData: SignUpValidation): Promise<{ token: string }> {
    const { name, email, password } = postData;
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) { throw new ConflictException(AUTH_MESSAGES.EMAIL_ALREADY_EXISTS ); }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ name, email, password: hashedPassword });
    await user.save();

    const token = this.jwtService.sign({
      id: user._id,
    });

    return { token };
  }

  async login(postData: LoginValidation): Promise<{ token: string }> {
    const { email, password } = postData;
    const user = await this.userModel.findOne({ email });
    if (!user) { throw new NotFoundException(AUTH_MESSAGES.EMAIL_NOT_REGISTERED); }
    
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) { throw new UnauthorizedException(AUTH_MESSAGES.INCORRECT_PASSWORD); }
    
    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }
}
