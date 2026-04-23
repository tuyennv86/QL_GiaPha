import { Request } from 'express';

export interface JwtPayload {
  id: number;
  username: string;
  full_name: string;
  email: string;
  is_active: boolean;
  family_id: number | null;
  roles: string[];
  permissions: string[];
}

export interface RequestWithUser extends Request {
  user: JwtPayload;
}

export interface AccessTokenPayload {
  sub: number;
  username: string;
}

export interface RefreshPayload {
  sub: number;
  username: string;
  refreshToken: string;
}
