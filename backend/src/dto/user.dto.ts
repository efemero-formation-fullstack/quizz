import {UserRole} from "../enums/user-role.enum";

export class UserDto {
    id: number;
    username: string;
    email: string;
    birthdate: Date;
    gender: string;
    role: UserRole;
}