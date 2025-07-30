import { Injectable } from '@nestjs/common';
import { CreateGymDto } from './dto/create-gym.dto';
import { UpdateGymDto } from './dto/update-gym.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GymsService {
  constructor(private readonly prisma: PrismaService) {}

  create(tenancyId: string, createGymDto: CreateGymDto) {
    return this.prisma.gym.create({
      data: {
        address: createGymDto.address,
        name: createGymDto.name,
        legalDocsUrl: createGymDto.legalDocsUrl,
        legalEntityName: createGymDto.legalEntityName,
        tenancyId,
      },
    });
  }

  findAll(tenancyId: string) {
    return this.prisma.gym.findMany({ where: { tenancyId } });
  }

  findOne(id: string) {
    return this.prisma.gym.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  update(id: string, updateGymDto: UpdateGymDto) {
    return this.prisma.gym.update({
      where: {
        id,
      },
      data: updateGymDto,
    });
  }

  remove(id: string) {
    return this.prisma.gym.delete({
      where: {
        id,
      },
    });
  }
}
