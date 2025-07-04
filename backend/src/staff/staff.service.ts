import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { StaffDto } from './dto/staff.dto';
import { User } from '../../generated/prisma';

@Injectable()
export class StaffService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<StaffDto[]> {
    const users = await this.prisma.user.findMany({
      where: { category: 'STAFF' },
    });
    return users.map(parseUser);
  }

  async findOne(id: string): Promise<StaffDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException();
    }
    return parseUser(user);
  }

  async create(createStaffDto: CreateStaffDto): Promise<StaffDto> {
    const newUser = await this.prisma.user.create({
      data: {
        firstName: createStaffDto.firstName,
        lastName: createStaffDto.lastName,
        email: createStaffDto.email,
        phoneNumber: createStaffDto.phoneNumber,
        category: 'STAFF',
      },
    });
    return parseUser(newUser);
  }

  async update(id: string, updateStaffDto: UpdateStaffDto): Promise<StaffDto> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        ...updateStaffDto,
        updatedAt: new Date(),
      },
    });
    return parseUser(updatedUser);
  }

  async remove(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}

function parseUser(user: User): StaffDto {
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
