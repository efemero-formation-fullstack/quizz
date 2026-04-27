import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { RegisterFormDto, LoginFormDto } from '../../dto/auth.form.dto';
import { UserDto } from '../../dto/user.dto';
import { userEntityToDto } from '../../mappers/user.mapper';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterFormDto): Promise<UserDto> {
    const user = await this.authService.register(body);
    return userEntityToDto(user);
  }

  @Post('login')
  async login(@Body() body: LoginFormDto): Promise<{ token: string }> {
    return await this.authService.login(body);
  }
}
