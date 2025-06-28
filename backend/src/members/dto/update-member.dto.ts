import { User } from '../../../generated/prisma';

export class UpdateMemberDto
  implements Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>
{
  firstName!: string;
  lastName!: string;
  email?: string; // Making email optional for update
  phoneNumber?: string | null;
  walletAddress?: string;
  membershipStatus?: string;
  membershipType?: string | null;
  membershipNftId?: string | null;
  waiverStatus?: string;
  waiverHash?: string | null;
  profilePicUrl?: string | null;
}
