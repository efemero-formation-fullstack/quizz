import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuestionEntity } from './question.entity';
import { QuizzEntity } from './quizz.entity';

@Entity({ name: 'themes' })
export class ThemeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => QuizzEntity, (q) => q.themes)
  @JoinTable({ name: 'quizzes_themes' })
  quizzes: QuizzEntity[];

  @OneToMany(() => QuestionEntity, (q) => q.theme)
  questions: QuestionEntity[];
}
