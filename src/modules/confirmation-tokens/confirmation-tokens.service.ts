import ms from 'ms';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomBytes } from 'crypto';
import { ConfigService } from '@nestjs/config';

import { User } from '../../db/entities/user.entity';
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

  async create(user: User): Promise<string> {
    const token = randomBytes(32).toString('hex');

    const expirationDuration = this.configService.getOrThrow<string>(
      'CONFIRMATION_MAIL_EXPIRATION',
    );

    const confirmationToken = await this.confirmationRepository.create({
      token,
      user,
      expirationDate: new Date(Date.now() + ms(expirationDuration)),
    });

    return confirmationToken.token;
  }

  async confirmEmail(token: string): Promise<string> {
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

    this.usersService.confirmUser(emailToken.user);

    return 'Email successfully confirmed';
  }
}
