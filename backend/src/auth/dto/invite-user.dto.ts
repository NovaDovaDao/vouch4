import { IsEmail, IsEnum } from '@nestjs/class-validator';
import { UserCategory } from '../../../generated/prisma';

export class InviteUserDto {
  @IsEmail()
  email: string;

  @IsEnum(UserCategory)
  category: UserCategory;
}
