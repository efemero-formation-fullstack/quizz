import { Controller, Param, Post, Req } from '@nestjs/common';
import { UserDto } from 'src/dtos/user.dto';
import { RequireRole } from 'src/guards/require-role/require-role.decorator';
import { Session } from 'src/interfaces/session.interface';
import { userEntityToDto } from 'src/mappers/user.mapper';
import { UserService } from 'src/services/user/user.service';

@Controller('friend')
export class FriendController {
  constructor(private readonly _userService: UserService) {}

  @Post('')
  @RequireRole()
  async addFriend(
    @Req() req: Request & { session: Session },
    @Param('friend_email') friendEmail: string,
  ): Promise<{ data: UserDto }> {
    const user = await this._userService.addFriend(req.session.id, friendEmail);
    const userDto = userEntityToDto(user);
    return { data: userDto };
  }
}
