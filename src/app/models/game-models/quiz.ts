import { Question } from './question';

export interface Quiz {
    id: string;
    name: string;
    description?: string;
    questions: Array<string> | Array<Question>,   // id of Questions
    duration: Number
}