import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';
import { User, UserCategory } from '../../generated/prisma';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './auth-jwt.interface';
import { jwtConstants } from './constants';
import { MailService } from '../mail/mail.service';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Injectable()
export class AuthService {
  readonly cookieName = 'access_token';
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  validateToken(token: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.jwtService.verify(token, {
      secret: jwtConstants.secret,
    });
  }

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.prisma.user.findUniqueOrThrow({ where: { email } });
    if (bcrypt.compareSync(pass, user.passwordHash!)) {
      // Remove password_hash before returning the user object for security
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash, ...result } = user;
      return result as User;
    }
    return null;
  }

  async login(loginDto: LoginDto, res: Response) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user || !user.isActive) {
      this.logger.warn('User does not exist or inactive');
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: 'MANAGER',
      hasTenancy: !!user.tenancyId,
    } satisfies JwtPayload;
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: jwtConstants.expiresIn,
      secret: jwtConstants.secret,
    });
    res.cookie(this.cookieName, accessToken, {
      httpOnly: true,
      secure: true,
    });
    res.sendStatus(HttpStatus.ACCEPTED);
  }

  logout(res: Response) {
    res.clearCookie(this.cookieName);
    res.sendStatus(HttpStatus.ACCEPTED);
  }

  // Helper to hash passwords for initial setup or user creation
  // IMPORTANT: Do NOT expose this via an API endpoint in production!
  hashPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  async inviteUser(email: string, category: UserCategory, tenancyId?: string) {
    // 1. Check if user already exists with a password
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser && existingUser.passwordHash) {
      throw new BadRequestException(
        'User with this email already exists and has a password set.',
      );
    }

    let user: User;
    if (existingUser && !existingUser.passwordHash) {
      // User exists but hasn't set password (e.g., previous invitation)
      user = existingUser;
      this.logger.log(`Re-inviting user ${email}.`);
    } else {
      // 2. Create the user without a password
      user = await this.prisma.user.create({
        data: {
          email,
          firstName: '',
          lastName: '',
          category,
          tenancyId,
        },
      });
      this.logger.log(`New user ${email} created for invitation.`);
    }

    // 3. Generate and store invitation token
    // Invalidate any previous invitation tokens for this user
    await this.prisma.invitationToken.deleteMany({
      where: { userId: user.id },
    });

    const token = uuidv4();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // Token valid for 24 hours

    await this.prisma.invitationToken.create({
      data: {
        token,
        userId: user.id,
        expiresAt,
      },
    });
    this.logger.log(`Invitation token generated for user ${user.id}.`);

    // 4. Send invitation email
    const frontendUrl = this.configService.get<string>('frontendUrl');
    const invitationLink = `${frontendUrl}/set-password?token=${token}`; // Your frontend route

    await this.mailService.sendInvitationEmail(
      user.email,
      `${user.firstName} ${user.lastName}`,
      invitationLink,
    );

    return { message: 'Invitation sent successfully!', userId: user.id };
  }

  async setUserPassword(token: string, newPasswordPlain: string) {
    // 1. Validate the token
    const invitationToken = await this.prisma.invitationToken.findUnique({
      where: { token },
      include: { user: true }, // Include the related user
    });

    if (!invitationToken) {
      throw new NotFoundException('Invalid or expired invitation token.');
    }

    if (invitationToken.expiresAt < new Date()) {
      await this.prisma.invitationToken.delete({
        where: { id: invitationToken.id },
      }); // Clean up expired token
      throw new UnauthorizedException(
        'Invitation token has expired. Please request a new invitation.',
      );
    }

    // 2. Hash the new password
    const hashedPassword = await bcrypt.hash(newPasswordPlain, 10);

    // 3. Update user's password
    await this.prisma.user.update({
      where: { id: invitationToken.userId },
      data: {
        passwordHash: hashedPassword,
        isActive: true, // Ensure user is active upon setting password
      },
    });
    this.logger.log(`Password set for user ${invitationToken.userId}.`);

    // 4. Delete the used token
    await this.prisma.invitationToken.delete({
      where: { id: invitationToken.id },
    });
    this.logger.log(`Invitation token ${token} deleted after use.`);

    return { message: 'Password set successfully. You can now log in.' };
  }
}
