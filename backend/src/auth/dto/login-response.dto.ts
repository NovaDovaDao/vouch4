import { User } from '../../../generated/prisma';
import { UserJwtResponse } from '../auth-jwt.interface';

export class LoginResponseDto implements UserJwtResponse {
  user: Pick<User, 'id' | 'email' | 'isSuperUser' | 'tenancyId'>;
  accessToken: string;
}
