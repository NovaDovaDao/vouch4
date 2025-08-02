import { Injectable } from '@nestjs/common';
import { CreateGymDto } from './dto/create-gym.dto';
import { UpdateGymDto } from './dto/update-gym.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtPayload } from '../auth/auth-jwt.interface';
import { TenancyService } from '../tenancy/tenancy.service';

@Injectable()
export class GymsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tenancyService: TenancyService,
  ) {}

  async create(user: JwtPayload, createGymDto: CreateGymDto) {
    const tenancy = await this.tenancyService.findOne(user);
    return this.prisma.gym.create({
      data: {
        address: createGymDto.address,
        name: createGymDto.name,
        legalDocsUrl: createGymDto.legalDocsUrl,
        legalEntityName: createGymDto.legalEntityName,
        tenancyId: tenancy.id,
      },
    });
  }

  async findAll(user: JwtPayload) {
    const tenancy = await this.tenancyService.findOne(user);
    return this.prisma.gym.findMany({ where: { tenancy } });
  }

  async findOne(user: JwtPayload, id: string) {
    const tenancy = await this.tenancyService.findOne(user);
    return this.prisma.gym.findUniqueOrThrow({
      where: {
        id,
        tenancy,
      },
    });
  }

  async update(user: JwtPayload, id: string, updateGymDto: UpdateGymDto) {
    const tenancy = await this.tenancyService.findOne(user);
    return this.prisma.gym.update({
      where: {
        id,
        tenancy,
      },
      data: updateGymDto,
    });
  }

  async remove(user: JwtPayload, id: string) {
    const tenancy = await this.tenancyService.findOne(user);
    return this.prisma.gym.delete({
      where: {
        id,
        tenancy,
      },
    });
  }
}
