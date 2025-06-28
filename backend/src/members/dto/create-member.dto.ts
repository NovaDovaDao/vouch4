import { $Enums, User } from '../../../generated/prisma';

export class CreateMemberDto
  implements Omit<User, 'id' | 'createdAt' | 'updatedAt'>
{
  passwordHash: string | null;
  category: $Enums.UserCategory;
  isSuperUser: boolean;
  isActive: boolean;
  phoneNumber: string | null;
  profilePicUrl: string | null;
  tenancyId: string | null;
  firstName!: string;
  lastName!: string;
  email!: string;
  walletAddress!: string;
  membershipStatus?: string; // Optional, will default in DB
  membershipType?: string;
  membershipNftId?: string;
  waiverStatus?: string; // Optional, will default in DB
  waiverHash?: string;
}
