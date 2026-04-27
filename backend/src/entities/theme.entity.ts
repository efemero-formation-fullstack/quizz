import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuizzEntity } from './quizz.entity';

@Entity({ name: 'themes' })
export class ThemeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => QuizzEntity, (q) => q.themes)
  @JoinTable({ name: 'quizzes_themes' })
  quizzes: ThemeEntity[];
}
