import { Module } from "jsr:@danet/core";
import { MembersService } from "./members.service.ts";
import { MembersController } from "./members.controller.ts";
import { PrismaService } from "../shared/prisma.service.ts";

@Module({
  controllers: [MembersController],
  injectables: [MembersService, PrismaService],
})
export class MemberModule {}
