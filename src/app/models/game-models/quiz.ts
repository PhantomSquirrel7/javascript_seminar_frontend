import { Question } from './question';

export interface Quiz {
    _id: string;
    name: string;
    description?: string;
    questions: Array<string> | Array<Question>   // id of Questions
}