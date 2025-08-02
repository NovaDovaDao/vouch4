import { Injectable } from '@nestjs/common';
import { CreateTenancyDto } from './dto/create-tenancy.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtPayload } from '../auth/auth-jwt.interface';
import { UpdateTenancyDto } from './dto/update-tenancy.dto';

@Injectable()
export class TenancyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: JwtPayload, createTenancyDto: CreateTenancyDto) {
    const existing = await this.prisma.tenancy.findUnique({
      where: { tenancyOwnerUserId: user.sub },
    });
    if (existing) throw new Error('Already has tenancy');

    const tenancy = await this.prisma.tenancy.create({
      data: {
        tenancyOwnerUserId: user.sub,
        contactEmail: createTenancyDto.contactEmail,
        name: createTenancyDto.name,
        legalName: createTenancyDto.legalName,
      },
    });

    await this.prisma.user.update({
      where: { id: user.sub },
      data: {
        tenancyId: tenancy.id,
      },
    });

    return tenancy;
  }

  findOne(user: JwtPayload) {
    return this.prisma.tenancy.findUniqueOrThrow({
      where: {
        tenancyOwnerUserId: user.sub,
      },
    });
  }

  update(user: JwtPayload, updateTenancyDto: UpdateTenancyDto) {
    return this.prisma.tenancy.update({
      where: {
        tenancyOwnerUserId: user.sub,
      },
      data: updateTenancyDto,
    });
  }
}
