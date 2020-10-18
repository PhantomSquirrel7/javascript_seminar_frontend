import { Quiz } from '../model/quiz';

export interface QuizUpdate {
    gameType: string;
    sessionId: string;
    players: string[];
    quizes: Quiz[];
    getSolution: boolean;
    quizIndex: number;
    countDownStarted: boolean;
    quizOver: boolean;
    taskId: string;
}
