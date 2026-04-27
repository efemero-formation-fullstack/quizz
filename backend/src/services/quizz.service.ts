import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizzEntity } from 'src/entities/quizz.entity';
import { ThemeEntity } from 'src/entities/theme.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ThemeService {
  constructor(
    @InjectRepository(ThemeEntity)
    private readonly _quizzRepo: Repository<QuizzEntity>,
  ) {}

  async getAll(): Promise<QuizzEntity[]> {
    return await this._quizzRepo.find();
  }

  async getById(id: number): Promise<QuizzEntity> {
    const quizz = await this._quizzRepo.findOne({ where: { id } });
    if (!quizz) throw new Error('Quizz not found');
    return quizz;
  }

  async create(data: Omit<QuizzEntity, 'id' | 'role'>): Promise<QuizzEntity> {
    const existingTitle = await this._quizzRepo.findOne({
      where: { title: data.title },
    });
    if (existingTitle)
      throw new Error(`Quizz with title ${data.title} already exists`);

    return await this._quizzRepo.save(data);
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
