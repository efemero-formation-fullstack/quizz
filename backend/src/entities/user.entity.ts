import {
  Column,
  Entity,
  Index,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GameEntity } from './game.entity';
import { Gender } from '../enums/gender.enum';
import { UserRole } from '../enums/user-role.enum';
import { QuizzEntity } from './quizz.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column()
  username: string;

  @Index({ unique: true })
  @Column()
  email: string;

  @Column({ type: 'date' })
  birthdate: Date;

  @Column({
    type: 'enum',
    enum: Gender,
  })
  gender: Gender;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToMany(() => GameEntity, (game) => game.user)
  games: GameEntity[];

  @OneToMany(() => QuizzEntity, (quizz) => quizz.owner)
  quizzes: QuizzEntity[];

  @ManyToMany(() => UserEntity, (friend) => friend.friends)
  friends: UserEntity[];
}
