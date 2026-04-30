import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuestionEntity } from './question.entity';

@Entity({ name: 'answers' })
export class AnswerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  answer: string;

  @ManyToOne(() => QuestionEntity, (q) => q.answers)
  @JoinColumn({ name: 'question_id' })
  question: QuestionEntity;
}
