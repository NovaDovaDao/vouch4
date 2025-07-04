import {
  IsBoolean,
  IsEmail,
  IsEthereumAddress,
  IsHash,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { User } from '../../../generated/prisma';

export class CreateMemberDto
  implements
    Pick<
      User,
      | 'passwordHash'
      | 'isActive'
      | 'phoneNumber'
      | 'firstName'
      | 'lastName'
      | 'email'
      | 'walletAddress'
    >
{
  @IsHash('sha1')
  passwordHash: string | null;

  @IsBoolean()
  isActive: boolean;

  @IsPhoneNumber()
  @IsOptional()
  phoneNumber: string | null;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsEmail()
  email!: string;

  @IsEthereumAddress()
  walletAddress!: string;
}
