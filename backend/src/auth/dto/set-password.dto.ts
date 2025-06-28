import { IsNotEmpty, IsString } from 'class-validator';
import { IsStrongPassword } from 'class-validator';

export class SetPasswordDto {
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsStrongPassword()
  newPassword: string;
}
