import { Quiz } from '../model/quiz';

export interface quizSolution {
    sessionId: string;
    players: string[];
    quiz: Quiz;
    solution: number[];
}