import { Controller, Delete, Get, Param, ParseIntPipe } from '@nestjs/common';
import { QuizzDto } from 'src/dtos/quizz.dto';
import { QuizzEntityToDto } from 'src/mappers/quizz.mapper';
import { QuizzService } from 'src/services/quizz/quizz.service';

@Controller('quizz')
export class QuizzController {
  constructor(private readonly quizzService: QuizzService) {}

  @Get()
  async getAll(): Promise<{ data: QuizzDto[] }> {
    const themes = await this.quizzService.getAll();
    return { data: themes.map(QuizzEntityToDto) };
  }

  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ data: QuizzDto }> {
    const quizz = await this.quizzService.getById(id);
    return { data: QuizzEntityToDto(quizz) };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.quizzService.delete(id);
  }
}
