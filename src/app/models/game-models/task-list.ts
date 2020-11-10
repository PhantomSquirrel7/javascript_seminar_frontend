import { Alias } from './alias';
import { DrawIt } from './drawIt';
import {Quiz} from './quiz';
import { SimpleTask } from './simpleTask';

export interface TaskList {
    // id: string;
    quizzes: Array<Quiz>;
    aliases: Array<Alias>;
    drawits: Array<DrawIt>;
    simpleTasks: Array<SimpleTask>;
}