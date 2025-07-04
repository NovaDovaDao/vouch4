import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ClassDto } from './dto/class.dto';

@Injectable()
export class ClassesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ClassDto[]> {
    return this.prisma.class.findMany();
  }
}
