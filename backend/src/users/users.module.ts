import { Module } from "@danet/core";
import { UsersService } from "./users.service.ts";
import { PrismaService } from "../shared/prisma.service.ts";

@Module({
  controllers: [],
  injectables: [UsersService, PrismaService],
})
export class UsersModule {}
