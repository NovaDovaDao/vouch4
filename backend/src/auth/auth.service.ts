// backend/src/auth/auth.service.ts
import { Injectable } from "@danet/core";
import { LoginDto, LoginResponseDto } from "../users/user.model.ts";
import { UsersService } from "../users/users.service.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.3.0/mod.ts";
import { User } from "../../prisma/client.ts";

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && bcrypt.compareSync(pass, user.passwordHash)) {
      // Remove password_hash before returning the user object for security
      const { passwordHash, ...result } = user;
      return result as User;
    }
    return null;
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto | null> {
    const user = await this.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      console.log("oh no");
      return null; // Authentication failed
    }
    // For MVP, you can return a simple "token" or just the user info.
    // A real app would generate a JWT here.
    const accessToken = crypto.randomUUID(); // Simple, insecure demo token
    return {
      username: user.username,
      role: user.role as "staff" | "admin",
      accessToken: accessToken, // Frontend can send this back in subsequent requests
    };
  }

  // Helper to hash passwords for initial setup or user creation
  // IMPORTANT: Do NOT expose this via an API endpoint in production!
  hashPassword(password: string): string {
    return bcrypt.hashSync(password);
  }
}
