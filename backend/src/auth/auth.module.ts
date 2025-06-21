// backend/src/auth/auth.module.ts
import { Module } from "jsr:@danet/core";
import { AuthService } from "./auth.service.ts";
import { AuthController } from "./auth.controller.ts";
import { UsersModule } from "../users/users.module.ts";

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  injectables: [AuthService],
})
export class AuthModule {}
