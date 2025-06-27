export interface Member {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string | null;
  walletAddress: string;
  membershipStatus?: string;
  membershipType?: string | null;
  membershipNftId?: string | null;
  waiverStatus?: string;
  waiverHash?: string | null;
  profilePicUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class CreateMemberDto
  implements Omit<Member, 'id' | 'createdAt' | 'updatedAt'>
{
  firstName!: string;
  lastName!: string;
  email!: string;
  phoneNumber?: string;
  walletAddress!: string;
  membershipStatus?: string; // Optional, will default in DB
  membershipType?: string;
  membershipNftId?: string;
  waiverStatus?: string; // Optional, will default in DB
  waiverHash?: string;
  profilePicUrl?: string;
}

export class UpdateMemberDto
  implements Partial<Omit<Member, 'id' | 'createdAt' | 'updatedAt'>>
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
