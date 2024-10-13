import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genSalt, hash } from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../../db/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;

    const salt = await genSalt();

    const hashedPassword = await hash(password, salt);

    const newUser = this.usersRepository.create({
      email,
      password: hashedPassword,
    });

    const user = await this.usersRepository.save(newUser);

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email: email },
    });
  }

  async findById(id: number): Promise<User | null> {
    if (!id) {
      return null;
    }

    return this.usersRepository.findOne({
      where: { id },
    });
  }

  async confirmUser(user: User): Promise<void> {
    user.emailConfirmed = true;
    await this.usersRepository.update(
      { id: user.id },
      { emailConfirmed: true },
    );
  }
}
