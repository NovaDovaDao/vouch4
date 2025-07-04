import {
  IsEmail,
  IsEthereumAddress,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
} from 'class-validator';
import { User } from '../../../generated/prisma';

export class UpdateMemberDto
  implements
    Partial<
      Pick<
        User,
        | 'firstName'
        | 'lastName'
        | 'email'
        | 'phoneNumber'
        | 'walletAddress'
        | 'profilePicUrl'
      >
    >
{
  @IsString()
  @IsOptional()
  firstName!: string;

  @IsString()
  @IsOptional()
  lastName!: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsPhoneNumber()
  @IsOptional()
  phoneNumber?: string | null;

  @IsEthereumAddress()
  @IsOptional()
  walletAddress?: string;

  @IsUrl()
  @IsOptional()
  profilePicUrl?: string | null;
}
