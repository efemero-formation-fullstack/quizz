import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { Session } from '../../interfaces/session.interface';
import { UserDto } from '../../dtos/user.dto';
import { UpdateUserDto } from '../../dtos/user.form.dto';
import { UserRole } from '../../enums/user-role.enum';
import { RequireRole } from '../../guards/require-role/require-role.decorator';
import { userEntityToDto } from '../../mappers/user.mapper';
import { UserService } from '../../services/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get()
  // @RequireRole(UserRole.ADMIN)
  async getAll(): Promise<{ data: UserDto[] }> {
    const users = await this._userService.getAll();
    return { data: users.map(userEntityToDto) };
  }

  @Get(':id')
  @RequireRole()
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ data: UserDto }> {
    const user = await this._userService.getById(id);
    return { data: userEntityToDto(user) };
  }

  @Patch(':id')
  @RequireRole()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ): Promise<{ data: UserDto }> {
    const user = await this._userService.update(id, body);
    return { data: userEntityToDto(user) };
  }

  @Post(':id/friend')
  @RequireRole()
  async addFriend(
    @Param('id', ParseIntPipe) id: number,
    @Body('email') friendEmail: string,
  ): Promise<{ data: UserDto }> {
    const user = await this._userService.addFriend(id, friendEmail);
    return { data: userEntityToDto(user) };
  }

  @Delete('friend/:friendId')
  @RequireRole()
  async removeFriend(
    @Param('friendId', ParseIntPipe) friendId: number,
    @Req() req: Request & { session: Session },
  ): Promise<{ data: UserDto }> {
    const user = await this._userService.removeFriend(req.session.id, friendId);
    return { data: userEntityToDto(user) };
  }

  @Delete(':id')
  @RequireRole(UserRole.ADMIN)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this._userService.delete(id);
  }
}
