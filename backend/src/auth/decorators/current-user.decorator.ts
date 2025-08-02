import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../auth-jwt.interface';

/**
 * Custom decorator to retrieve the authenticated user from the request object.
 * This assumes your authentication guard (e.g., JwtAuthGuard) has already
 * attached the user object to `req.user`.
 *
 * @example
 * Usage in a controller method:
 * @Get('profile')
 * getProfile(@CurrentUser() user: UserFromJwt) {
 * console.log(user.id, user.role);
 * return user;
 * }
 */
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JwtPayload => {
    // Get the HTTP request object
    const request = ctx.switchToHttp().getRequest<{ user: JwtPayload }>();

    // The user object is typically attached to `req.user` by Passport.js strategies
    // You might also add an explicit check or throw an error if user is not found,
    // though the guard should prevent this method from even being called if unauthenticated.
    return request.user;
  },
);
