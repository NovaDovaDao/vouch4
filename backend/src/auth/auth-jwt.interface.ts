import { User } from '../../generated/prisma';

export interface UserJwtResponse {
  user: Pick<User, 'id' | 'email' | 'tenancyId' | 'isSuperUser'>;
  accessToken: string;
}
