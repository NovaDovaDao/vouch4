// backend/src/auth/auth.controller.ts
import { Controller, Post, Body } from "@danet/core";
import { AuthService } from "./auth.service.ts";
import { LoginDto } from "../users/user.model.ts";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
