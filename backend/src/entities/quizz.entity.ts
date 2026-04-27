import { QuizzVisibility } from 'src/enums/quizz_visibility.enum';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
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
}
