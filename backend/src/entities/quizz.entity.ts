import { QuizzVisibility } from 'src/enums/quizz_visibility.enum';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GameEntity } from './game.entity';
import { QuestionEntity } from './question.entity';
import { ThemeEntity } from './theme.entity';

@Entity({ name: 'quizzes' })
export class QuizzEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  imgUrl: string;

  @Column({
    type: 'enum',
    enum: QuizzVisibility,
    default: QuizzVisibility.PRIVATE,
  })
  visibility: QuizzVisibility;

  @ManyToMany(() => ThemeEntity, (t) => t.quizzes)
  @JoinTable({ name: 'quizzes_themes' })
  themes: ThemeEntity[];

  @ManyToMany(() => QuestionEntity, (q) => q.quizzes)
  @JoinTable({ name: 'quizzes_questions' })
  questions: QuestionEntity[];

  @OneToMany(() => GameEntity, (game) => game.quizz)
  games: GameEntity[];
}
