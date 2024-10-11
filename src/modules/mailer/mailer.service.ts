import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';

import { User } from '../../db/entities/user.entity';
import { ConfirmationTokensService } from '../confirmation-tokens/confirmation-tokens.service';

@Injectable()
export class MailerService {
  private nodemailerTransport: Transporter;
  private nodemailerEmail: string;

  constructor(
    private configService: ConfigService,
    private confirmationService: ConfirmationTokensService,
  ) {
    this.nodemailerEmail =
      this.configService.getOrThrow<string>('NODEMAILER_EMAIL') || '';
    this.nodemailerTransport = createTransport({
      host: this.configService.getOrThrow<string>('NODEMAILER_HOST'),
      port: this.configService.getOrThrow<number>('NODEMAILER_PORT'),
      secure: this.configService.getOrThrow<number>('NODEMAILER_PORT') == 465,
      auth: {
        user: this.nodemailerEmail,
        pass: this.configService.getOrThrow<string>('NODEMAILER_PASSWORD'),
      },
    });
  }

  async sendConfirmationEmail(user: User): Promise<void> {
    const token = this.confirmationService.create(user);

    await this.nodemailerTransport.sendMail({
      from: this.nodemailerEmail,
      to: user.email,
      subject: 'Confirmation Email',
      text: `Please confirm your email by clicking the following link: http://localhost:3000/users/confirm-email?token=${token}`,
    });
  }
}
