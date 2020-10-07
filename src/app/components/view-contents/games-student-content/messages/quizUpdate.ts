import { Quiz } from '../model/quiz';

export interface QuizUpdate {
    sessionId: string;
    players: string[];
    quiz: Quiz;
    selectedAnswers: number[];
    getSolution: boolean;
}