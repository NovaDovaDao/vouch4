import { Injectable } from '@nestjs/common';
import { User } from '../../generated/prisma';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './user.model';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {} // Inject PrismaService

  async findOneByUsername(username: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { username: username },
    });
    return user; // Cast to your User interface
  }

  async createUser(userDto: CreateUserDto): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        username: userDto.username,
        passwordHash: userDto.password, // This should be a HASHED password
        role: userDto.role || 'staff',
      },
    });
    return user;
  }
}
