import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AnswerEntity } from './answer.entity';

@Entity({ name: 'question' })
export class QuestionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  correct_answer_id: number;

  @Column({ type: 'text' })
  question: string;

  //RELATION
  @OneToMany (()=> AnswerEntity, (a) => a.question)
  answers: AnswerEntity[];
}
