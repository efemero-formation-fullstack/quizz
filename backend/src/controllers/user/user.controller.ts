import { Controller, Delete, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UserService } from '../../services/user/user.service';
import { UserDto } from '../../dto/user.dto';
import { userEntityToDto } from '../../mappers/user.mapper';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getAll(): Promise<{ data: UserDto[] }> {
        const users = await this.userService.getAll();
        return { data: users.map(userEntityToDto) };
    }

    @Get(':id')
    async getById(@Param('id', ParseIntPipe) id: number): Promise<{ data: UserDto }> {
        const user = await this.userService.getById(id);
        return { data: userEntityToDto(user) };
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.userService.delete(id);
    }
}