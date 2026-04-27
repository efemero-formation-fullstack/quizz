import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginFormDto, RegisterFormDto } from '../../dto/auth.form.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly _userRepo: Repository<UserEntity>,
        private readonly _jwtService: JwtService,
    ) {}

    async register(data: RegisterFormDto): Promise<UserEntity> {
        const existingEmail = await this._userRepo.findOne({ where: { email: data.email
            } });
        if (existingEmail) throw new Error('Email already exists');

        const existingUsername = await this._userRepo.findOne({ where: { username:
                data.username } });
        if (existingUsername) throw new Error('Username already exists');

        data.password = await bcrypt.hash(data.password, 10);
        return await this._userRepo.save(data);
    }

    async login(data: LoginFormDto): Promise<{ token: string }> {
        const user = await this._userRepo.findOne({ where: { username: data.username }
        });
        if (!user) throw new Error('Invalid credentials');

        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        if (!isPasswordValid) throw new Error('Invalid credentials');

        const token = this._jwtService.sign({ id: user.id, role: user.role });
        return { token };
    }
}