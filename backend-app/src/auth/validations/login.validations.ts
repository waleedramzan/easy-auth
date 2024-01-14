import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { VALIDATIONS } from 'src/constants';

export class LoginValidation {
  @IsNotEmpty({ message: VALIDATIONS.EMAIL.REQUIRED })
  @IsEmail({}, { message: VALIDATIONS.EMAIL.IS_NOT_VALID_EMAIL })
  readonly email: string;

  @IsNotEmpty({ message: VALIDATIONS.PASSWORD.REQUIRED })
  @MinLength(8, { message: VALIDATIONS.PASSWORD.MIN_LENGTH })
  readonly password: string;
}
