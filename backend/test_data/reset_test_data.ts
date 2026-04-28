import process from 'node:process';
import 'reflect-metadata';
import * as path from 'node:path';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { Gender } from 'src/enums/gender.enum';
import { UserRole } from 'src/enums/user-role.enum';
import { DataSource } from 'typeorm';
import {
  AnswerEntity,
  QuestionEntity,
  QuizzEntity,
  ThemeEntity,
  UserEntity,
} from '../src/entities/index';
import adultes from './openquizzdb_adulte.json';
import espaces from './openquizzdb_espace.json';
import jos from './openquizzdb_jo.json';
import users from './user_quizz.json';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT!,
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  synchronize: true,
  dropSchema: true,
  logging: true,
  entities: [
    UserEntity,
    QuizzEntity,
    ThemeEntity,
    QuestionEntity,
    AnswerEntity,
  ],
  migrations: [],
  subscribers: [],
});

async function main() {
  try {
    const ds = await AppDataSource.initialize();

    // Run all the operations inside a transaction
    await ds.transaction(async (em) => {
      // insert an admin user
      const admin = em.create(UserEntity, {
        username: 'admin',
        email: 'admin@quizz.eu',
        birthdate: '1980-02-22',
        gender: Gender.M,
        password: await bcrypt.hash('admin!123', 10),
        role: UserRole.ADMIN,
      });
      await em.save(admin);

      // insert users from json (1000 users from https://mockaroo.com)
      // password: password!123
      let user: UserEntity;
      let userData;
      for (userData of users) {
        user = em.create(UserEntity, userData);
        await em.save(user);
      }

      let theme: ThemeEntity;
      let question: QuestionEntity;
      let answer: AnswerEntity;
      for (const cat of [adultes, jos, espaces]) {
        theme = em.create(ThemeEntity, {
          name: cat['catégorie-nom-slogan'].fr['catégorie'],
        });
        await em.save(theme);
        for (const level of [
          cat.quizz.fr['débutant'],
          cat.quizz.fr['confirmé'],
          cat.quizz.fr['expert'],
        ]) {
          for (const q of level) {
            let answers: AnswerEntity[] = [];
            let correct_answer: AnswerEntity;
            for (const r of q.propositions) {
              answer = em.create(AnswerEntity, {
                answer: r,
              });
              answer = await em.save(answer);
              if (r === q.réponse) {
                correct_answer = answer;
              } else {
                answers.push(answer);
              }
            }
            question = em.create(QuestionEntity, {
              question: q.question,
              answers: answers,
              correct_answer: correct_answer,
            });
            await em.save(question);
          }
        }
      }
    });
  } catch (e) {
    console.log(e);
  } finally {
    AppDataSource.destroy();
  }
}

main();
