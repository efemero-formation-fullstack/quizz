import { QuizzDto } from 'src/dtos/quizz.dto';
import { UserDto } from 'src/dtos/user.dto';
import { QuizzEntity } from 'src/entities/quizz.entity';
import { gameEntityToDto } from './game.mapper';

export function QuizzEntityToDto(entity: QuizzEntity) {
  const dto = new QuizzDto();
  dto.id = entity.id;
  dto.title = entity.title;
  dto.imgUrl = entity.imgUrl;
  dto.visibility = entity.visibility;
  if (entity.games) {
    dto.games = entity.games.map(gameEntityToDto);
  }
  if (entity.owner) {
    const ownerDto = new UserDto();
    ownerDto.id = entity.owner.id;
    ownerDto.username = entity.owner.username;
    ownerDto.email = entity.owner.email;
    ownerDto.birthdate = entity.owner.birthdate;
    ownerDto.gender = entity.owner.gender;
    ownerDto.role = entity.owner.role;
    dto.owner = ownerDto;
  }
  return dto;
}
