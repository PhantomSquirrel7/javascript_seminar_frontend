import { Alias } from './alias';
import { DrawIt } from './drawIt';
import {Quiz} from './quiz';

export interface TaskList {
    id: string;
    quizzes: Array<Quiz>;
    aliases: Array<Alias>;
    drawits: Array<DrawIt>;
}