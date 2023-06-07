import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import VerificationTokenPayload from './verificationTokenPayload.interface';
import EmailService from '../email/email.service';
import {
  EMAIL_CONFIRMATION_URL,
  JWT_VERIFICATION_TOKEN_EXPIRATION_TIME,
  JWT_VERIFICATION_TOKEN_SECRET,
} from '@app/config';
import { UserService } from '@app/user/user.service';

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly userService: UserService,
  ) {}

  public async sendVerificationLink(email: string) {
    const payload: VerificationTokenPayload = { email };
    const token = this.jwtService.sign(payload, {
      secret: '7AnEd5epXmdaJfUrokkQ',
    });
    const user = await this.userService.getByEmail(email);
    const url = `${EMAIL_CONFIRMATION_URL}?token=${token}`;

    const text = `Welcome to E-GATE. 
    your username is: ${user.username}.
    To confirm the email address, click here: ${url}
    To login go to http://localhost:3000/login`;

    return this.emailService.sendMail({
      to: email,
      subject: 'Email confirmation',
      text,
    });
  }

  public async confirmEmail(email: string) {
    const user = await this.userService.getByEmail(email);
    if (user.isEmailConfirmed) {
      throw new BadRequestException('Email already confirmed');
    }
    await this.userService.markEmailAsConfirmed(email);
  }

  public async decodeConfirmationToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: '7AnEd5epXmdaJfUrokkQ',
      });
      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      console.log(payload);
      throw new BadRequestException();
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad confirmation token');
    }
  }
}
