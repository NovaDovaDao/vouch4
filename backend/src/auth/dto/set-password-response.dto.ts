import { ApiProperty } from '@nestjs/swagger';

export class SetPasswordResponseDto {
  @ApiProperty()
  message: string;
}
