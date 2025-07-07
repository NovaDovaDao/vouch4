import { Injectable, NotFoundException } from '@nestjs/common';
import { CheckIn, User } from '../../generated/prisma';
import { PrismaService } from '../prisma/prisma.service';
import { MemberDto } from './dto/member.dto';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MembersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<MemberDto[]> {
    const users = await this.prisma.user.findMany({
      where: { category: 'MEMBER' },
    });
    return users.map(parseUser);
  }

  async findOne(id: string): Promise<MemberDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException();
    }
    return parseUser(user);
  }

  async findOneByWalletAddress(
    walletAddress: string,
  ): Promise<MemberDto | null> {
    const user = await this.prisma.user.findUnique({
      where: { walletAddress: walletAddress },
    });
    return parseUser(user!);
  }

  async create(createMemberDto: CreateMemberDto): Promise<MemberDto> {
    const newUser = await this.prisma.user.create({
      data: {
        firstName: createMemberDto.firstName,
        lastName: createMemberDto.lastName,
        email: createMemberDto.email,
        phoneNumber: createMemberDto.phoneNumber,
        category: 'MEMBER',
      },
    });
    return parseUser(newUser);
  }

  async update(
    id: string,
    updateMemberDto: UpdateMemberDto,
  ): Promise<MemberDto> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        ...updateMemberDto,
        updatedAt: new Date(), // Manually update updatedAt or rely on Prisma's @updatedAt
      },
    });
    return parseUser(updatedUser);
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

function parseUser(user: User): MemberDto {
  return {
    email: user.email,
    firstName: user.firstName,
    id: user.id,
    isActive: user.isActive,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    profilePicUrl: user.profilePicUrl,
    updatedAt: user.updatedAt,
  };
}
