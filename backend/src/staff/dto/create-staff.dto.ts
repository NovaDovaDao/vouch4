import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { User } from '../../../generated/prisma';

export class CreateStaffDto
  implements Pick<User, 'email' | 'firstName' | 'lastName' | 'phoneNumber'>
{
  @IsPhoneNumber()
  @IsOptional()
  phoneNumber: string | null;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsEmail()
  email!: string;
}
