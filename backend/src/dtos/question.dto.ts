import { AnswerDto } from "./answer.dto";

export class QuestionDto {
    id: number;
    correct_answer_id: number;
    question: string;
    answers?: AnswerDto[];
}