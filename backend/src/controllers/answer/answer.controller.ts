import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AnswerDto } from 'src/dtos/answer.dto';
import { AnswerCreateDto } from 'src/dtos/answer.form.dto';
import {
  answerEntityToAnswerDto,
  answerEntityToListingDto,
} from 'src/mappers/answer.mapper';
import { AnswerService } from 'src/services/answer/answer.service';

@Controller('answers')
export class AnswerController {
  constructor(private readonly _answerService: AnswerService) {}

  @Post()
  async create(@Body() dto: AnswerCreateDto): Promise<AnswerDto> {
    const entity = await this._answerService.create(dto);
    return answerEntityToListingDto(entity);
  }

  @Get()
  async getAll(): Promise<AnswerDto[]> {
    const entities = await this._answerService.getAll();
    return entities.map(answerEntityToListingDto);
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<AnswerDto> {
    const entity = await this._answerService.getById(id);
    return answerEntityToAnswerDto(entity);
  }
}
