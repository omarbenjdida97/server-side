import { Module } from '@nestjs/common';
import { EmailConfirmationController } from './emailConfirmation.controller';
import { EmailConfirmationService } from './emailConfirmation.service';
import EmailService from './email.service';
import { ConfigService } from '@nestjs/config';
import { UserService } from '@app/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from '@app/user/user.module';
@Module({
  imports: [UserModule],
  controllers: [EmailConfirmationController],
  providers: [
    EmailConfirmationService,
    EmailService,
    ConfigService,
    UserService,
    JwtService,
  ],
  exports: [],
})
export class EmailModule {}
