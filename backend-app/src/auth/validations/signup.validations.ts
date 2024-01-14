import { IsEmail, IsNotEmpty, MinLength, Matches } from 'class-validator';
import { PASSWORD_VALIDATION_REGEX, VALIDATIONS } from 'src/constants';

export class SignUpValidation {
  @IsNotEmpty({ message: VALIDATIONS.NAME.REQUIRED })
  readonly name: string;

  @IsNotEmpty({ message: VALIDATIONS.EMAIL.REQUIRED })
  @IsEmail({}, { message: VALIDATIONS.EMAIL.IS_NOT_VALID_EMAIL })
  readonly email: string;

  @IsNotEmpty({ message: VALIDATIONS.PASSWORD.REQUIRED })
  @MinLength(8, { message: VALIDATIONS.PASSWORD.MIN_LENGTH })
  @Matches(PASSWORD_VALIDATION_REGEX, {
    message: VALIDATIONS.PASSWORD.INPUT_VALIDATION,
  })
  readonly password: string;
}
