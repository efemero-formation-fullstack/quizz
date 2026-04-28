import { Gender } from 'src/enums/gender.enum';

export class RegisterFormDto {
  username: string;
  email: string;
  password: string;
  birthdate: Date;
  gender: Gender;
}
export class LoginFormDto {
  username: string;
  password: string;
}

