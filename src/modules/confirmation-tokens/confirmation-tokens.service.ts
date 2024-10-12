import ms from 'ms';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

import { UsersService } from '../users/users.service';
import { ConfirmationToken } from '../../db/entities/confirmation-token.entity';

@Injectable()
export class ConfirmationTokensService {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    @InjectRepository(ConfirmationToken)
    private confirmationRepository: Repository<ConfirmationToken>,
  ) {}

  async create(userId: number): Promise<string> {
    const token = crypto.randomBytes(32).toString('hex');

    const expirationDuration = this.configService.getOrThrow<string>(
      'CONFIRMATION_MAIL_EXPIRATION',
    );

    const expirationDate = new Date(Date.now() + ms(expirationDuration));

    const newConfirmationToken = await this.confirmationRepository.create({
      token,
      user: { id: userId },
      expirationDate,
    });

    const savedConfirmationToken =
      await this.confirmationRepository.save(newConfirmationToken);

    return savedConfirmationToken.token;
  }

  async confirmEmail(token: string): Promise<void> {
    const emailToken = await this.confirmationRepository.findOne({
      where: { token },
      relations: ['user'],
      select: { user: { id: true } },
    });

    if (!emailToken) {
      throw new NotFoundException(`Token with ID ${token} not found`);
    }

    if (emailToken.expirationDate < new Date()) {
      throw new UnauthorizedException('Token has expired');
    }

    await this.confirmationRepository.update(
      {
        token,
      },
      {
        used: true,
      },
    );

    return this.usersService.confirmUser(emailToken.user);
  }
}
