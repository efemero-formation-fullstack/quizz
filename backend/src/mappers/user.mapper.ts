import {UserEntity} from "../entities/user.entity";
import {UserDto} from "../dto/user.dto";

export function userEntityToDto(entity:UserEntity) {
    const dto = new UserDto();
    dto.id = entity.id;
    dto.username = entity.username;
    dto.email = entity.email;
    dto.birthdate = entity.birthdate;
    dto.gender = entity.gender;
    dto.role = entity.role;
    return dto;
}