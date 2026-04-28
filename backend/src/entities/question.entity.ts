import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AnswerEntity } from './answer.entity';
import { QuizzEntity } from './quizz.entity';

@Entity({ name: 'questions' })
export class QuestionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => AnswerEntity)
  @JoinColumn({ name: 'correct_answer_id' })
  correct_answer: AnswerEntity;

  @Column({ type: 'text' })
  question: string;

  @OneToMany(() => AnswerEntity, (a) => a.question)
  answers: AnswerEntity[];

  @ManyToMany(() => QuizzEntity, (q) => q.questions)
  @JoinTable({ name: 'quizzes_questions' })
  quizzes: QuizzEntity[];
}
