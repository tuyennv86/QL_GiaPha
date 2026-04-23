import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { JwtPayload } from '../common/interfaces/request-with-user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {
    const secret = configService.get<string>('jwt.secret');
    if (!secret) throw new Error('JWT secret is not defined');

    const options: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    };

    super(options);
  }

  async validate(payload: {
    sub: number;
    username: string;
    roles: string[];
    permissions: string[];
  }): Promise<JwtPayload> {
    const user = await this.userRepo.findOne({
      where: { id: payload.sub },
      select: [
        'id',
        'username',
        'full_name',
        'email',
        'is_active',
        'family_id',
      ],
    });

    if (!user || !user.is_active) {
      throw new UnauthorizedException(
        'Tài khoản không hợp lệ hoặc đã bị vô hiệu hóa',
      );
    }

    return {
      id: user.id,
      username: user.username,
      full_name: user.full_name,
      email: user.email,
      is_active: user.is_active,
      family_id: user.family_id,
      roles: payload.roles,
      permissions: payload.permissions,
    };
  }
}
