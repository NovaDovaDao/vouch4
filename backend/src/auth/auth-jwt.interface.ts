import { UserAtGymRole } from '../../generated/prisma';

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserAtGymRole;
  hasTenancy: boolean;
}
