import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { LoginFormDto, RegisterFormDto } from '../../dtos/auth.form.dto';
import { UserEntity } from '../../entities/user.entity';
import {
  BadRequestException
} from '@nestjs/common';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepo: Repository<UserEntity>,
    private readonly _jwtService: JwtService,
  ) {}

  async register(data: RegisterFormDto): Promise<UserEntity> {
    const existingEmail = await this._userRepo.findOne({
      where: { email: data.email },
    });
    if (existingEmail) throw new Error('Email already exists');

    const existingUsername = await this._userRepo.findOne({
      where: { username: data.username },
    });
    if (existingUsername) throw new Error('Username already exists');

    data.password = await bcrypt.hash(data.password, 10);
    return await this._userRepo.save(data);
  }

  async login(data: LoginFormDto): Promise<{ token: string }> {
    const user = await this._userRepo.findOne({
      where: { username: data.username },
    });
    if (!user) throw new BadRequestException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) throw new Error('Invalid credentials');

    const token = this._jwtService.sign({ id: user.id, role: user.role });
    return { token };
  }
}
