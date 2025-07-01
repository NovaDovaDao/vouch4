import { ApiProperty } from '@nestjs/swagger';
import { UserJwt } from '../auth-jwt.interface';
import { $Enums } from 'generated/prisma';

export class UserLoginResponseDto implements UserJwt {
  @ApiProperty({
    description: 'Type of user',
    example: 'STAFF',
    enum: $Enums.UserCategory,
  })
  category: $Enums.UserCategory;

  @ApiProperty({
    description: 'Unique identifier of the user',
    example: 'clxzyzqr00000abcde12345',
  })
  id: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Indicates if the user is a super administrator',
    example: false,
  })
  isSuperUser: boolean;

  @ApiProperty({
    description: 'The ID of the tenancy the user belongs to (if applicable)',
    example: 'clxzyzqr00001abcde67890',
    nullable: true, // Mark as nullable if it can be null (e.g., for Super Admin)
  })
  tenancyId: string | null; // Use `null` for TypeScript nullability

  // Add other properties if you decide to include them later, e.g.:
  // @ApiProperty({ description: 'The user category (e.g., MEMBER, STAFF, TENANT_OWNER)' })
  // category: string;
}
