import { User } from '../../generated/prisma';

export type UserJwt = Pick<
  User,
  'id' | 'email' | 'tenancyId' | 'isSuperUser' | 'category'
>;
export interface UserJwtResponse {
  user: UserJwt;
  accessToken: string;
}
