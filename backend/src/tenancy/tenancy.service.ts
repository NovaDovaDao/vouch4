import { Injectable } from '@nestjs/common';
import { CreateTenancyDto } from './dto/create-tenancy.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UserJwtResponse } from 'src/auth/auth-jwt.interface';
import { UpdateTenancyDto } from './dto/update-tenancy.dto';

@Injectable()
export class TenancyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    user: UserJwtResponse['user'],
    createTenancyDto: CreateTenancyDto,
  ) {
    const existing = await this.prisma.tenancy.findUnique({
      where: { tenancyOwnerUserId: user.id },
    });
    if (existing) throw new Error('Already has tenancy');

    const tenancy = await this.prisma.tenancy.create({
      data: {
        tenancyOwnerUserId: user.id,
        contactEmail: createTenancyDto.contactEmail,
        name: createTenancyDto.name,
        legalName: createTenancyDto.legalName,
      },
    });

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        tenancyId: tenancy.id,
      },
    });

    return tenancy;
  }

  findOne(userId: string) {
    return this.prisma.tenancy.findUniqueOrThrow({
      where: {
        tenancyOwnerUserId: userId,
      },
    });
  }

  update(userId: string, updateTenancyDto: UpdateTenancyDto) {
    return this.prisma.tenancy.update({
      where: {
        tenancyOwnerUserId: userId,
      },
      data: updateTenancyDto,
    });
  }
}
