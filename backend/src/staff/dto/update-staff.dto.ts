import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
} from 'class-validator';
import { User } from '../../../generated/prisma';

export class UpdateStaffDto
  implements
    Partial<
      Pick<
        User,
        | 'isActive'
        | 'phoneNumber'
        | 'firstName'
        | 'lastName'
        | 'email'
        | 'profilePicUrl'
      >
    >
{
  @IsPhoneNumber()
  @IsOptional()
  phoneNumber: string | null;

  @IsString()
  @IsOptional()
  firstName!: string;

  @IsString()
  @IsOptional()
  lastName!: string;

  @IsEmail()
  @IsOptional()
  email!: string;

  @IsUrl()
  @IsOptional()
  profilePicUrl?: string | null;
}
