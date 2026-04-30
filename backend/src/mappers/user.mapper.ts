import { QuizzDto } from '../dtos/quizz.dto';
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
  if (entity.quizzes) {
    dto.quizzes = entity.quizzes.map((quizz) => {
      const quizzDto = new QuizzDto();
      quizzDto.id = quizz.id;
      quizzDto.title = quizz.title;
      quizzDto.imgUrl = quizz.imgUrl;
      quizzDto.visibility = quizz.visibility;
      return quizzDto;
    });
  }
  if (entity.friends) {
    dto.friends = entity.friends.map((friend) => {
      const friendDto = new UserDto();
      friendDto.id = friend.id;
      friendDto.username = friend.username;
      friendDto.email = friend.email;
      friendDto.birthdate = friend.birthdate;
      friendDto.gender = friend.gender;
      friendDto.role = friend.role;
      return friendDto;
    });
  }
  return dto;
}
