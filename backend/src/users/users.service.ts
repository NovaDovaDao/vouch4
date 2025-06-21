// backend/src/users/users.service.ts
import { Injectable } from "jsr:@danet/core";
import { PrismaService } from "../shared/prisma.service.ts"; // Adjust path if needed
import { CreateUserDto } from "./user.model.ts";
import { User } from "../../prisma/client.ts";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {} // Inject PrismaService

  async findOneByUsername(username: string): Promise<User | null> {
    const user = await this.prisma.client.user.findUnique({
      where: { username: username },
    });
    return user as User | null; // Cast to your User interface
  }

  async createUser(userDto: CreateUserDto): Promise<User> {
    const user = await this.prisma.client.user.create({
      data: {
        username: userDto.username,
        passwordHash: userDto.password, // This should be a HASHED password
        role: userDto.role || "staff",
      },
    });
    return user;
  }
}
