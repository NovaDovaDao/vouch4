import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from 'generated/prisma';

export class MeResponseDto {
  @ApiProperty()
  email: string;

  @ApiProperty({
    description: 'Type of user',
    example: 'MANAGER',
    enum: $Enums.UserAtGymRole,
  })
  role: $Enums.UserAtGymRole;

  @ApiProperty()
  hasTenancy: boolean;
}
