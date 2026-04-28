import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { UserDto } from '../../dtos/user.dto';
import { UpdateUserDto } from '../../dtos/user.form.dto';
import { UserRole } from '../../enums/user-role.enum';
import { RequireRole } from '../../guards/require-role/require-role.decorator';
import { userEntityToDto } from '../../mappers/user.mapper';
import { UserService } from '../../services/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @RequireRole(UserRole.ADMIN)
  async getAll(): Promise<{ data: UserDto[] }> {
    const users = await this.userService.getAll();
    return { data: users.map(userEntityToDto) };
  }

  @Get(':id')
  @RequireRole()
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ data: UserDto }> {
    const user = await this.userService.getById(id);
    return { data: userEntityToDto(user) };
  }

  @Patch(':id')
  @RequireRole()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ): Promise<{ data: UserDto }> {
    const user = await this.userService.update(id, body);
    return { data: userEntityToDto(user) };
  }

  @Delete(':id')
  @RequireRole(UserRole.ADMIN)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.userService.delete(id);
  }
}
