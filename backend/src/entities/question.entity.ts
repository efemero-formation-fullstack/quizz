import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AnswerEntity } from './answer.entity';
import { QuizzEntity } from './quizz.entity';
import { ThemeEntity } from './theme.entity';

@Entity({ name: 'questions' })
export class QuestionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => AnswerEntity)
  @JoinColumn({ name: 'correct_answer_id' })
  correct_answer: AnswerEntity;

  @ManyToOne(() => ThemeEntity, (t) => t.questions)
  @JoinColumn({ name: 'theme_id' })
  theme: ThemeEntity;

  @Column({ type: 'text' })
  question: string;

  @OneToMany(() => AnswerEntity, (a) => a.question)
  answers: AnswerEntity[];

  @ManyToMany(() => QuizzEntity, (q) => q.questions)
  @JoinTable({ name: 'quizzes_questions' })
  quizzes: QuizzEntity[];
}
