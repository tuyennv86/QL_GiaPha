import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';
import { validateConfig } from './config/config.validation';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { MenuModule } from './menu/menu.module';
import { FamilyModule } from './family/family.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
      load: [appConfig, databaseConfig, jwtConfig],
      validate: validateConfig,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('database') as object,
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    PermissionsModule,
    MenuModule,
    FamilyModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
