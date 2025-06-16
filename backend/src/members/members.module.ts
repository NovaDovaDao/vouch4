import { Module } from "jsr:@danet/core";
import { MembersService } from "./members.service.ts";
import { MembersController } from "./members.controller.ts";

@Module({
  controllers: [MembersController],
  injectables: [MembersService],
})
export class MemberModule {}
