import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';
import { User } from '../../../generated/prisma';

export class UpdateMemberDto
  implements
    Partial<
      Pick<
        User,
        'firstName' | 'lastName' | 'email' | 'phoneNumber' | 'walletAddress'
      >
    >
{
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phoneNumber: string;
}
