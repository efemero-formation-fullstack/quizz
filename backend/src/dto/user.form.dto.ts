export class CreateUserDto {
    username: string;
    email: string;
    password: string;
    birthdate: Date;
    gender: string;
}
export class UpdateUserDto {
    username?: string;
    email?: string;
    birthdate?: Date;
    gender?: string;
}