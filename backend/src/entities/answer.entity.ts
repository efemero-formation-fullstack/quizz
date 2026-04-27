import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { QuestionEntity } from "./question.entity";

@Entity ({ name: 'answer'})
export class AnswerEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column ({ type: 'text' })
    answer:string;
    
    //RELATION
    @ManyToOne(()=> QuestionEntity,(q)=> q.answers)
    question: QuestionEntity;
}