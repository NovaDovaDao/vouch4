import { Module } from "@danet/core";
import { AppController } from "./app.controller.ts";
import { MemberModule } from "./members/members.module.ts";
import { UsersModule } from "./users/users.module.ts";
import { AuthModule } from "./auth/auth.module.ts";

@Module({
  controllers: [AppController],
  imports: [AuthModule, MemberModule, UsersModule],
})
export class AppModule {}
