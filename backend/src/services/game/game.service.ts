import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateGameDto } from 'src/dtos/game.form.dto';
import { GameEntity } from 'src/entities/game.entity';
import { Repository } from 'typeorm';

const RELATIONS = { relations: { user: true, quizz: true } };

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameEntity)
    private readonly _gameRepo: Repository<GameEntity>,
  ) {}

  async getAll(): Promise<GameEntity[]> {
    return await this._gameRepo.find(RELATIONS);
  }

  async getAllByUser(userId: number): Promise<GameEntity[]> {
    return await this._gameRepo.find({
      where: { user: { id: userId } },
      ...RELATIONS,
    });
  }

  async getAllByQuizz(quizzId: number): Promise<GameEntity[]> {
    return await this._gameRepo.find({
      where: { quizz: { id: quizzId } },
      ...RELATIONS,
    });
  }

  async getById(id: number): Promise<GameEntity> {
    const game = await this._gameRepo.findOne({ where: { id }, ...RELATIONS });
    if (!game) throw new NotFoundException(`Game #${id} not found`);
    return game;
  }

  async create(quizzId: number, userId: number): Promise<GameEntity> {
    const game = this._gameRepo.create({
      user: { id: userId },
      quizz: { id: quizzId },
    });
    return await this._gameRepo.save(game);
  }

  async update(id: number, data: UpdateGameDto): Promise<GameEntity> {
    const game = await this.getById(id);
    Object.assign(game, data);
    return await this._gameRepo.save(game);
  }

  async delete(id: number): Promise<void> {
    const game = await this.getById(id);
    await this._gameRepo.remove(game);
  }
}
