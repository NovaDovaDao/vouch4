import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Response,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './auth-jwt.interface';
import { InviteUserDto } from './dto/invite-user.dto';
import { SetPasswordDto } from './dto/set-password.dto';
import { SkipAuthGuard } from './guards/skipauth.guard';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { SetPasswordResponseDto } from './dto/set-password-response.dto';
import { ErrorDto } from '../error.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { MeResponseDto } from './dto/me-response.dto';
import { LoginResponseDto } from './dto/login-repsonse.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  @ApiOkResponse({ type: MeResponseDto })
  @ApiBadRequestResponse({ type: ErrorDto })
  currentUser(@CurrentUser() user: JwtPayload) {
    const currentUser = {
      email: user.email,
      role: user.role,
      hasTenancy: user.hasTenancy,
    } satisfies MeResponseDto;
    return currentUser;
  }

  @Post('login')
  @SkipAuthGuard()
  @ApiCreatedResponse({ type: LoginResponseDto })
  @ApiBadRequestResponse({ type: ErrorDto })
  async login(
    @Body(ValidationPipe) loginDto: LoginDto,
    @Response({ passthrough: true }) res,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.authService.login(loginDto, res);
  }

  @Post('invite')
  @ApiCreatedResponse()
  @ApiBadRequestResponse({ type: ErrorDto })
  inviteUser(
    @Body(ValidationPipe) inviteUserDto: InviteUserDto,
    @CurrentUser() user: JwtPayload,
  ) {
    // For simplicity, we'll allow category to be passed in DTO.
    // In a real app, an admin might only invite 'MEMBER' or specific 'STAFF' types.
    return this.authService.inviteUser(
      inviteUserDto.email,
      inviteUserDto.category,
      user.sub, // Pass tenancyId if inviting a member for a specific tenancy
    );
  }

  @Post('set-password')
  @SkipAuthGuard()
  @ApiCreatedResponse({ type: SetPasswordResponseDto })
  @ApiBadRequestResponse({ type: ErrorDto })
  setUserPassword(@Body(ValidationPipe) setPasswordDto: SetPasswordDto) {
    return this.authService.setUserPassword(
      setPasswordDto.token,
      setPasswordDto.newPassword,
    );
  }

  @Post('logout')
  @ApiCreatedResponse()
  logout(@Response({ passthrough: true }) res) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.authService.logout(res);
  }
}
