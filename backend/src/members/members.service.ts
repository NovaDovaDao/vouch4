import { Injectable, NotFoundException } from '@nestjs/common';
import { CheckIn, User } from '../../generated/prisma';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMemberDto, UpdateMemberDto } from './member.model';

@Injectable()
export class MembersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      where: { category: 'MEMBER' },
    });
  }

  async findOne(id: string): Promise<User> {
    const member = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!member) {
      throw new NotFoundException();
    }
    return member;
  }

  async findOneByWalletAddress(walletAddress: string): Promise<User | null> {
    const member = await this.prisma.user.findUnique({
      where: { walletAddress: walletAddress },
    });
    return member;
  }

  async create(createMemberDto: CreateMemberDto): Promise<User> {
    const newMember = await this.prisma.user.create({
      data: {
        firstName: createMemberDto.firstName,
        lastName: createMemberDto.lastName,
        email: createMemberDto.email,
        phoneNumber: createMemberDto.phoneNumber,
        walletAddress: createMemberDto.walletAddress,
        profilePicUrl: createMemberDto.profilePicUrl,
        category: 'MEMBER',
      },
    });
    return newMember;
  }

  async update(id: string, updateMemberDto: UpdateMemberDto): Promise<User> {
    const updatedMember = await this.prisma.user.update({
      where: { id },
      data: {
        ...updateMemberDto,
        updatedAt: new Date(), // Manually update updatedAt or rely on Prisma's @updatedAt
      },
    });
    return updatedMember;
  }

  async remove(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }

  // --- Check-in related methods ---
  async recordCheckIn(memberId: string): Promise<CheckIn> {
    const checkIn = await this.prisma.checkIn.create({
      data: {
        user: { connect: { id: memberId } }, // Connects to existing member
        timestamp: new Date(),
        gym: {},
      },
      include: {
        user: true, // Include member details in the response,
      },
    });
    return checkIn;
  }
}
