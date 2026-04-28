import { IsString } from "class-validator";

export class AnswerCreateDto {
   @IsString()
    answer:string;
}