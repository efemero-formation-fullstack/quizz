import { Gender } from 'src/enums/gender.enum';

export class CreateUserDto {
  username: string;
  email: string;
  password: string;
  birthdate: Date;
  gender: Gender;
}
export class UpdateUserDto {
  username?: string;
  email?: string;
  birthdate?: Date;
  gender?: Gender;
}
