import { QuestionDto } from "./question.dto";

export class AnswerDto {
    id:number;
    answer:string;

    questions?: QuestionDto;
}