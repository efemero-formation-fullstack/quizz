import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizzEntity } from 'src/entities/quizz.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuizzService {
  constructor(
    @InjectRepository(QuizzEntity)
    private readonly _quizzRepo: Repository<QuizzEntity>,
  ) {}

  async getAll(): Promise<QuizzEntity[]> {
    return await this._quizzRepo.find({
      relations: { games: true, owner: true },
    });
  }

  async getById(id: number): Promise<QuizzEntity> {
    const Theme = await this._quizzRepo.findOne({
      where: { id },
      relations: { games: true, owner: true },
    });
    if (!Theme) throw new Error('Theme not found');
    return Theme;
  }

  async create(data: Omit<QuizzEntity, 'id'>): Promise<QuizzEntity> {
    const existingTitle = await this._quizzRepo.findOne({
      where: { title: data.title },
    });
    if (existingTitle)
      throw new Error(`Quizz with title ${data.title} already exists`);

    return await this._quizzRepo.save(data);
  }

  async update(id: number, data: Partial<QuizzEntity>): Promise<QuizzEntity> {
    const Theme = await this.getById(id);
    Object.assign(Theme, data);
    return await this._quizzRepo.save(Theme);
  }

  async delete(id: number): Promise<void> {
    const Theme = await this.getById(id);
    await this._quizzRepo.remove(Theme);
  }
}
