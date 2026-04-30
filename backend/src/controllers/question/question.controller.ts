import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { QuestionDto } from '../../dtos/question.dto';
import {
  QuestionCreateDto,
  QuestionUpdateDto,
} from '../../dtos/question.form.dto';
import {
  questionEntityToQuestionDto,
  questionEntityToQuestionListingDto,
} from '../../mappers/question.mapper';
import { QuestionService } from '../../services/question/question.service';

@Controller('question')
export class QuestionController {
  constructor(private readonly _questionService: QuestionService) {}

  @Post()
  async create(@Body() dto: QuestionCreateDto): Promise<QuestionDto> {
    const entity = await this._questionService.create(dto);
    return questionEntityToQuestionListingDto(entity);
  }

  @Get()
  async getAll(): Promise<QuestionDto[]> {
    const entities = await this._questionService.getAll();
    return entities.map(questionEntityToQuestionListingDto);
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<QuestionDto> {
    const entity = await this._questionService.getById(id);
    return questionEntityToQuestionDto(entity);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: QuestionUpdateDto,
  ): Promise<QuestionDto> {
    const entity = await this._questionService.update(id, dto);
    return questionEntityToQuestionListingDto(entity);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this._questionService.delete(id);
  }
}
