import { ThemeDto } from 'src/dto/theme.dto';
import { ThemeEntity } from 'src/entities/theme.entity';
import { UserDto } from '../dto/user.dto';
import { UserEntity } from '../entities/user.entity';

export function userEntityToDto(entity: UserEntity) {
  const dto = new UserDto();
  dto.id = entity.id;
  dto.username = entity.username;
  dto.email = entity.email;
  dto.birthdate = entity.birthdate;
  dto.gender = entity.gender;
  dto.role = entity.role;
  return dto;
}

export function themeEntityToDto(entity: ThemeEntity) {
  const dto = new ThemeDto();
  dto.id = entity.id;
  dto.name = entity.name;
  return dto;
}

