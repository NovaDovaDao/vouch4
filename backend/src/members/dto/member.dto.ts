import { User } from '../../../generated/prisma';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
} from 'class-validator';

export class MemberDto
  implements
    Pick<
      User,
      | 'id'
      | 'email'
      | 'firstName'
      | 'lastName'
      | 'isActive'
      | 'updatedAt'
      | 'phoneNumber'
      | 'profilePicUrl'
    >
{
  @IsString()
  id: string;

  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsBoolean()
  isActive: boolean;

  @IsDateString()
  updatedAt: Date;

  @IsPhoneNumber()
  @IsOptional()
  phoneNumber: string | null;

  @IsUrl()
  @IsOptional()
  profilePicUrl: string | null;
}
