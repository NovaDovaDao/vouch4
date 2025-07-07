import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { User } from '../../../generated/prisma';

export class CreateMemberDto
  implements
    Pick<User, 'isActive' | 'phoneNumber' | 'firstName' | 'lastName' | 'email'>
{
  @IsBoolean()
  isActive: boolean;

  @IsPhoneNumber()
  @IsOptional()
  phoneNumber: string | null;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;
}
