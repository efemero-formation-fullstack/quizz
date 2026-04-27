import { Body, Controller, Get, Param, ParseIntPipe, Post, Req } from '@nestjs/common';
import { QuestionDto } from 'src/dtos/question.dto';
import { QuestionCreateDto } from 'src/dtos/question.form.dto';
import { questionEntityToQuestionDto, questionEntityToQuestionListingDto } from 'src/mappers/question.mapper';
import { QuestionService } from 'src/services/question/question.service';

@Controller('question')
export class QuestionController {
    constructor(private readonly _questionService: QuestionService) {}

 @Post()
    async create(@Body() dto:QuestionCreateDto): Promise<QuestionDto> {
        const entity = await this._questionService.create(dto);
        return questionEntityToQuestionListingDto(entity);
    }

    @Get()
    async getAll(): Promise<QuestionDto[]> {
        const entities = await this._questionService.getAll();
        return entities.map(questionEntityToQuestionListingDto);
    }

    @Get(':id')
    async getById(@Param('id', ParseIntPipe) id:number):Promise<QuestionDto> {
        const entity = await  this._questionService.getById(id);
        return questionEntityToQuestionDto(entity);
    }

}
