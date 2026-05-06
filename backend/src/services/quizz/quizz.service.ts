import { Injectable } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { QuizzCreateDto } from 'src/dtos/quizz.form.dto';
  import { QuestionEntity } from 'src/entities/question.entity';                           
  import { QuizzEntity } from 'src/entities/quizz.entity';
  import { ThemeEntity } from 'src/entities/theme.entity';                                 
  import { In, Repository } from 'typeorm';

  @Injectable()
  export class QuizzService {
    constructor(
      @InjectRepository(QuizzEntity)
      private readonly _quizzRepo: Repository<QuizzEntity>,
      @InjectRepository(ThemeEntity)
      private readonly _themeRepo: Repository<ThemeEntity>,
      @InjectRepository(QuestionEntity)
      private readonly _questionRepo: Repository<QuestionEntity>,
    ) {}

    async getAll(): Promise<QuizzEntity[]> {
      return await this._quizzRepo.find({
        relations: { games: true, owner: true },
      });
    }

    async getById(id: number): Promise<QuizzEntity> {
      const quizz = await this._quizzRepo.findOne({
        where: { id },
        relations: {
          games: true,
          owner: true,
          questions: { answers: true, correct_answer: true, theme: true },
        },
      });
      if (!quizz) throw new Error('Quizz not found');
      return quizz;
    }

    async create(data: QuizzCreateDto): Promise<QuizzEntity> {
      const existingTitle = await this._quizzRepo.findOne({
        where: { title: data.title },
      });
      if (existingTitle)
        throw new Error(`Quizz with title ${data.title} already exists`);

      const quizz = this._quizzRepo.create({
        title: data.title,
        imgUrl: data.imgUrl,
        visibility: data.visibility,
      });

      if (data.themeIds && data.themeIds.length > 0) {
        quizz.themes = await this._themeRepo.findBy({ id: In(data.themeIds) });
        quizz.questions = await this._questionRepo.find({
          where: { theme: { id: In(data.themeIds) } },
          take: 5,
        });
      }

      const saved = await this._quizzRepo.save(quizz);
      return await this.getById(saved.id);
    }

    async update(id: number, data: Partial<QuizzEntity>): Promise<QuizzEntity> {
      const quizz = await this.getById(id);
      Object.assign(quizz, data);
      return await this._quizzRepo.save(quizz);
    }

    async delete(id: number): Promise<void> {
      const quizz = await this.getById(id);
      await this._quizzRepo.remove(quizz);
    }
  }