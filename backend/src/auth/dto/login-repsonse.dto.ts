import { IsBoolean } from 'class-validator';

export class LoginResponseDto {
  @IsBoolean()
  ok: boolean;
}
