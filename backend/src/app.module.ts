import { Module } from "@danet/core";
// import { TodoModule } from "./todo/module.ts";
import { AppController } from "./app.controller.ts";
import { MemberModule } from "./members/members.module.ts";

@Module({
  controllers: [AppController],
  imports: [MemberModule],
})
export class AppModule {}
