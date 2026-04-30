import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepo: Repository<UserEntity>,
  ) {}

  async getAll(): Promise<UserEntity[]> {
    return await this._userRepo.find({ relations: { games: true } });
  }

  async getById(id: number): Promise<UserEntity> {
    const user = await this._userRepo.findOne({
      where: { id },
      relations: { games: true },
    });
    if (!user) throw new Error('User not found');
    return user;
  }

  async create(data: Omit<UserEntity, 'id' | 'role'>): Promise<UserEntity> {
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

  async update(id: number, data: Partial<UserEntity>): Promise<UserEntity> {
    const user = await this.getById(id);
    Object.assign(user, data);
    return await this._userRepo.save(user);
  }

  async delete(id: number): Promise<void> {
    const user = await this.getById(id);
    await this._userRepo.remove(user);
  }
}
