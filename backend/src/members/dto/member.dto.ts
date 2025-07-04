import { User } from '../../../generated/prisma';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEthereumAddress,
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
      | 'walletAddress'
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

  @IsEthereumAddress()
  @IsOptional()
  walletAddress: string | null;

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
