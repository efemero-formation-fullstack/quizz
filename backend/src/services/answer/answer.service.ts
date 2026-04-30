import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerEntity } from 'src/entities/answer.entity';
import { Repository } from 'typeorm';
import { AnswerCreateDto } from 'src/dtos/answer.form.dto';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(AnswerEntity)
    private readonly _answerRepo: Repository<AnswerEntity>,
  ) {}

  async create(dto: AnswerCreateDto): Promise<AnswerEntity> {
    const answer = this._answerRepo.create(dto);
    return await this._answerRepo.save(answer);
  }

  async getById(id: number): Promise<AnswerEntity> {
    const answer = await this._answerRepo.findOne({
      where: { id },
      relations: ['question'],
    });

    if (!answer) {
      throw new NotFoundException(`La réponse avec l'id ${id} n'existe pas`);
    }

    return answer;
  }

  async getAll(): Promise<AnswerEntity[]> {
    return await this._answerRepo.find({
      relations: ['question'],
    });
  }
}
