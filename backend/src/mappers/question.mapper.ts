
import { QuestionDto } from "src/dtos/question.dto";
import { QuestionCreateDto } from "src/dtos/question.form.dto";
import { QuestionEntity } from "src/entities/question.entity";
import { DeleteDateColumn } from "typeorm";

export function questionEntityToQuestionDto (entity: QuestionEntity): QuestionDto {
    const dto = new QuestionDto();
    dto.answers = entity.answers;
    dto.id = entity.id;
    dto.question = entity.question;
    dto.id = entity.id;

    return dto
}

export function questionEntityToQuestionListingDto (entity: QuestionEntity): QuestionDto {
    const dto = new QuestionDto();
    dto.answers = entity.answers;
    dto.id = entity.id;
    dto.question = entity.question;
    dto.id = entity.id;

    return dto
}

export function questionCreateDtoToQuestionEntity(dto: QuestionCreateDto): Partial<QuestionEntity>{
    const entity = new QuestionEntity();
    entity.question = dto.question;
    return entity;
}

export function questionUpdateDtoToQuestionEntity(dto: QuestionCreateDto): Partial<QuestionEntity>{
    const entity = new QuestionEntity();
    entity.question = dto.question;
    return entity;
}
