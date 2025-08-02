// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-require-imports
require('dotenv').config();

export const jwtConstants = {
  secret: process.env.JWT_SECRET_KEY as string,
  expiresIn: process.env.JWT_EXPIRESIN as string,
};
