import { Injectable } from '@nestjs/common';
import { ContractDto } from './dto/contract.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContractsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ContractDto[]> {
    return new Promise(() => []);
  }
}
