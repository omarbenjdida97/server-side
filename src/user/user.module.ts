import { Module } from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { UserController } from '@app/user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@app/user/entities/user.entity';
import { AuthGuard } from '@app/guards/auth.guard';
import { DefaultAdminModule, DefaultAdminSite } from 'nestjs-admin';
import { UserAdmin } from './user.admin';
import { EmailConfirmationService } from '@app/email/emailConfirmation.service';
import EmailService from '@app/email/email.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), DefaultAdminModule],
  controllers: [UserController],
  providers: [
    UserService,
    AuthGuard,
    EmailConfirmationService,
    EmailService,
    JwtService,
    ConfigService,
  ],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {
  constructor(private readonly adminSite: DefaultAdminSite) {
    adminSite.register('User', UserAdmin);
  }
}
