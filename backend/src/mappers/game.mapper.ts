import { GameDto } from '../dtos/game.dto';
import { QuizzDto } from '../dtos/quizz.dto';
import { UserDto } from '../dtos/user.dto';
import { GameEntity } from '../entities/game.entity';

export function gameEntityToDto(entity: GameEntity): GameDto {
  const dto = new GameDto();
  dto.id = entity.id;
  dto.score = entity.score;
  dto.status = entity.status;

  if (entity.user) {
    const userDto = new UserDto();
    userDto.id = entity.user.id;
    userDto.username = entity.user.username;
    userDto.email = entity.user.email;
    userDto.birthdate = entity.user.birthdate;
    userDto.gender = entity.user.gender;
    userDto.role = entity.user.role;
    dto.user = userDto;
  }

  if (entity.quizz) {
    const quizzDto = new QuizzDto();
    quizzDto.id = entity.quizz.id;
    quizzDto.title = entity.quizz.title;
    quizzDto.imgUrl = entity.quizz.imgUrl;
    quizzDto.visibility = entity.quizz.visibility;
    dto.quizz = quizzDto;
  }

  return dto;
}
