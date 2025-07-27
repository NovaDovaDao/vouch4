import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ClassDto } from './dto/class.dto';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Injectable()
export class ClassesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ClassDto[]> {
    return this.prisma.class.findMany();
  }

  async findOne(id: string): Promise<ClassDto> {
    const klass = await this.prisma.class.findUnique({
      where: { id },
    });
    if (!klass) {
      throw new NotFoundException();
    }
    return klass;
  }

  async create(createClassDto: CreateClassDto): Promise<ClassDto> {
    return this.prisma.class.create({
      data: {
        capacity: createClassDto.capacity,
        name: createClassDto.name,
        scheduleDateTime: createClassDto.scheduleDateTime,
        description: createClassDto.description,
        gym: {
          connect: {
            id: createClassDto.gymId,
          },
        },
        ...(createClassDto.instructorId
          ? {
              instructor: {
                connect: {
                  id: createClassDto.instructorId,
                },
              },
            }
          : {}),
      },
    });
  }

  async update(id: string, updateClassDto: UpdateClassDto): Promise<ClassDto> {
    return this.prisma.class.update({
      where: { id },
      data: {
        ...updateClassDto,
        updatedAt: new Date(), // Manually update updatedAt or rely on Prisma's @updatedAt
      },
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.class.delete({
      where: { id },
    });
  }
}
