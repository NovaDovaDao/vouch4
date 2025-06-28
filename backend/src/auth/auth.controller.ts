import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { UserJwtResponse } from './auth-jwt.interface';
import { InviteUserDto } from './dto/invite-user.dto';
import { SetPasswordDto } from './dto/set-password.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiResponse({ status: 201, type: LoginResponseDto })
  async login(@Body(ValidationPipe) loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('invite')
  inviteUser(
    @Body(ValidationPipe) inviteUserDto: InviteUserDto,
    @Request() req: { user: UserJwtResponse['user'] },
  ) {
    // For simplicity, we'll allow category to be passed in DTO.
    // In a real app, an admin might only invite 'MEMBER' or specific 'STAFF' types.
    return this.authService.inviteUser(
      inviteUserDto.email,
      inviteUserDto.category,
      req.user.tenancyId!, // Pass tenancyId if inviting a member for a specific tenancy
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('set-password')
  @HttpCode(HttpStatus.OK) // Ensure it returns 200 OK on success
  setUserPassword(@Body(ValidationPipe) setPasswordDto: SetPasswordDto) {
    return this.authService.setUserPassword(
      setPasswordDto.token,
      setPasswordDto.newPassword,
    );
  }
}
