import { UserDto } from '../dtos/user.dto';
import { UserEntity } from '../entities/user.entity';
import { gameEntityToDto } from './game.mapper';

export function userEntityToDto(entity: UserEntity) {
  const dto = new UserDto();
  dto.id = entity.id;
  dto.username = entity.username;
  dto.email = entity.email;
  dto.birthdate = entity.birthdate;
  dto.gender = entity.gender;
  dto.role = entity.role;
  if (entity.games) {
    dto.games = entity.games.map(gameEntityToDto);
  }
  return dto;
}
