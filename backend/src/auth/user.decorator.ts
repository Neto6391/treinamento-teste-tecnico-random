import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtUserPayload } from './user.interface';


export const User = createParamDecorator<keyof JwtUserPayload | undefined>(
  (data: keyof JwtUserPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as JwtUserPayload;

    return data ? user?.[data] : user;
  },
);