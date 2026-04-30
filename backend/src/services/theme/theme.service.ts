import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ThemeCreateDto } from 'src/dtos/theme.form.dto';
import { ThemeEntity } from 'src/entities/theme.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ThemeService {
  constructor(
    @InjectRepository(ThemeEntity)
    private readonly _themeRepo: Repository<ThemeEntity>,
  ) {}

  async getAll(): Promise<ThemeEntity[]> {
    return await this._themeRepo.find({ relations: ['quizzes', 'questions'] });
  }

  async getById(id: number): Promise<ThemeEntity> {
    const Theme = await this._themeRepo.findOne({
      where: { id },
      relations: ['quizzes', 'questions'],
    });
    if (!Theme) throw new Error('Theme not found');
    return Theme;
  }

  async create(data: ThemeCreateDto): Promise<ThemeEntity> {
    const existingName = await this._themeRepo.findOne({
      where: { name: data.name },
    });
    if (existingName)
      throw new Error(`Theme with name ${data.name} already exists`);

    return await this._themeRepo.save(data);
  }

  async update(id: number, data: Partial<ThemeEntity>): Promise<ThemeEntity> {
    const Theme = await this.getById(id);
    Object.assign(Theme, data);
    return await this._themeRepo.save(Theme);
  }

  async delete(id: number): Promise<void> {
    const Theme = await this.getById(id);
    await this._themeRepo.remove(Theme);
  }
}
