import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionDto } from 'src/dtos/question.dto';
import { QuestionEntity } from 'src/entities/question.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionService {

constructor(
    @InjectRepository(QuestionEntity)
    private readonly _questionRepo: Repository<QuestionEntity>
){}

async create(dto: QuestionDto):Promise<QuestionEntity>{
    const question = this._questionRepo.create(dto);
    return await this._questionRepo.save(question);
}

async getById(id: number):Promise<QuestionEntity>{
    const question = await this._questionRepo.findOne({
        where: { id },
        relations: ['question'],
    });

    if(!question){
        throw new NotFoundException(`La question avec l'id ${id} n'existe pas`);
    }

    return question;
}

async getAll():Promise<QuestionEntity[]>{
    return await this._questionRepo.find({
        relations:['question'],
    });
} 

}
