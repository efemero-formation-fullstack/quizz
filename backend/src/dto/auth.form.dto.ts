export class RegisterFormDto {
    username: string;
    email: string;
    password: string;
    birthdate: Date;
    gender: string;
}
export class LoginFormDto {
    username: string;
    password: string;
}