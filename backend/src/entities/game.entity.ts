import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GameStatus } from '../enums/game-status.enum';
import { QuizzEntity } from './quizz.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'games' })
export class GameEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (u) => u.games)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => QuizzEntity, (q) => q.games)
  @JoinColumn({ name: 'quizz_id' })
  quizz: QuizzEntity;

  @Column({ default: 0 })
  score: number;

  @Column({
    type: 'enum',
    enum: GameStatus,
    default: GameStatus.READY,
  })
  status: GameStatus;
}
