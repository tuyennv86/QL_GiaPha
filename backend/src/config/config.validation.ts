import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsString,
  Min,
  Max,
  MinLength,
  validateSync,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsInt()
  @Min(1024)
  @Max(65535)
  PORT: number;

  @IsString() DB_HOST: string;
  @IsInt() DB_PORT: number;
  @IsString() DB_USER: string;
  @IsString() DB_PASS: string;
  @IsString() DB_NAME: string;

  @IsString()
  @MinLength(16, { message: 'JWT_SECRET phải tối thiểu 16 ký tự' })
  JWT_SECRET: string;

  @IsString() JWT_EXPIRES_IN: string;

  @IsString()
  @MinLength(16, { message: 'JWT_REFRESH_SECRET phải tối thiểu 16 ký tự' })
  JWT_REFRESH_SECRET: string;

  @IsString() JWT_REFRESH_EXPIRES_IN: string;
}

export function validateConfig(config: Record<string, unknown>) {
  const validated = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validated, { skipMissingProperties: false });
  if (errors.length > 0) {
    throw new Error(`Cấu hình môi trường không hợp lệ:\n${errors.toString()}`);
  }
  return validated;
}
