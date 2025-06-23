import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '../../generated/prisma';
import { UsersService } from '../users/users.service';
import { LoginDto, LoginResponseDto } from '../users/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.configService.getOrThrow('JWT_SECRET_KEY');
  }

  validateToken(token: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET_KEY,
    });
  }

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && bcrypt.compareSync(pass, user.passwordHash)) {
      // Remove password_hash before returning the user object for security
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash, ...result } = user;
      return result as User;
    }
    return null;
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto | null> {
    const user = await this.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    // For MVP, you can return a simple "token" or just the user info.
    // A real app would generate a JWT here.
    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        username: user.username,
      },
      {
        secret: this.configService.getOrThrow<string>('JWT_SECRET_KEY'),
        expiresIn: '5d',
      },
    );
    return {
      username: user.username,
      role: user.role as 'staff' | 'admin',
      accessToken: accessToken, // Frontend can send this back in subsequent requests
    };
  }

  // Helper to hash passwords for initial setup or user creation
  // IMPORTANT: Do NOT expose this via an API endpoint in production!
  hashPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }
}
