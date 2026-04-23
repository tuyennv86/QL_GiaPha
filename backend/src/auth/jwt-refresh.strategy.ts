import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptionsWithRequest } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh_token'),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.refreshSecret'),
      passReqToCallback: true,
    } as StrategyOptionsWithRequest);
  }

  validate(
    req: Request,
    payload: { sub: number; username: string },
  ): { sub: number; username: string; refreshToken: string } {
    const refreshToken = (req.body as { refresh_token?: string }).refresh_token;
    if (!refreshToken)
      throw new UnauthorizedException('Refresh token không tồn tại');
    return { ...payload, refreshToken };
  }
}
