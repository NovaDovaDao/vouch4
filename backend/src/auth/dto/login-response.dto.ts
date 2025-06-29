import { ApiProperty } from '@nestjs/swagger';
import { UserLoginResponseDto } from './user-login-response.dto';

export class LoginResponseDto {
  @ApiProperty({
    description: 'User details after successful login',
    type: UserLoginResponseDto, // Crucial: Link to the nested DTO
  })
  user: UserLoginResponseDto; // Use the new DTO type here

  @ApiProperty({
    description: 'JWT access token for authentication',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;
}
