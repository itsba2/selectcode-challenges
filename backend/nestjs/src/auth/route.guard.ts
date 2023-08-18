import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';

@Injectable()
export class RouteGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    console.log('route guard', request);
    return request.isAuthenticated();
  }
}
