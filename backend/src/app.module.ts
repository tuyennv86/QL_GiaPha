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
import { MarriagesModule } from './marriages/marriages.module';
import { PersonModule } from './person/person.module';
import { FamilybrannchesModule } from './familybrannches/familybrannches.module';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ParentChildModule } from './parent-child/parent-child.module';
import { RoleMenusModule } from './role-menus/role-menus.module';
import { RolePermissionModule } from './role-permission/role-permission.module';
import { UserBranchRoleModule } from './user-branch-role/user-branch-role.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
      load: [appConfig, databaseConfig, jwtConfig],
      validate: validateConfig,
    }),

    // STATIC FILES
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
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
    MarriagesModule,
    PersonModule,
    FamilybrannchesModule,
    ParentChildModule,
    RoleMenusModule,
    RolePermissionModule,
    UserBranchRoleModule,
  ],

  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
