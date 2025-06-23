import { Injectable, NotFoundException } from '@nestjs/common';
import { CheckIn, Member } from '../../generated/prisma';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMemberDto, UpdateMemberDto } from './member.model';

@Injectable()
export class MembersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Member[]> {
    const members = await this.prisma.member.findMany();
    return members as Member[];
  }

  async findOne(id: number): Promise<Member> {
    const member = await this.prisma.member.findUnique({
      where: { id: id },
    });
    if (!member) {
      throw new NotFoundException();
    }
    return member as Member;
  }

  async findOneByWalletAddress(walletAddress: string): Promise<Member | null> {
    const member = await this.prisma.member.findUnique({
      where: { walletAddress: walletAddress },
    });
    return member as Member | null;
  }

  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    const newMember = await this.prisma.member.create({
      data: {
        name: createMemberDto.name,
        email: createMemberDto.email,
        phoneNumber: createMemberDto.phoneNumber,
        walletAddress: createMemberDto.walletAddress,
        membershipStatus: createMemberDto.membershipStatus || 'Pending', // Default if not provided
        membershipType: createMemberDto.membershipType,
        membershipNftId: createMemberDto.membershipNftId,
        waiverStatus: createMemberDto.waiverStatus || 'Pending Signature', // Default if not provided
        waiverHash: createMemberDto.waiverHash,
        profilePicUrl: createMemberDto.profilePicUrl,
      },
    });
    return newMember as Member;
  }

  async update(id: number, updateMemberDto: UpdateMemberDto): Promise<Member> {
    const updatedMember = await this.prisma.member.update({
      where: { id: id },
      data: {
        ...updateMemberDto,
        updatedAt: new Date(), // Manually update updatedAt or rely on Prisma's @updatedAt
      },
    });
    return updatedMember as Member;
  }

  async remove(id: number): Promise<void> {
    await this.prisma.member.delete({
      where: { id: id },
    });
  }

  // --- Check-in related methods ---
  async recordCheckIn(memberId: number): Promise<CheckIn> {
    const checkIn = await this.prisma.checkIn.create({
      data: {
        member: { connect: { id: memberId } }, // Connects to existing member
        timestamp: new Date(),
      },
      include: {
        member: true, // Include member details in the response
      },
    });
    return checkIn;
  }
}
