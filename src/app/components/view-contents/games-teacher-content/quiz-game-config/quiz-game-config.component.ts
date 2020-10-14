import { Component, OnInit } from '@angular/core';
import { GamesApiService } from '@app/services/custom/games/games-api.service';
import { Question } from '@app/models/game-models/question';
import { Quiz } from '@app/models/game-models/quiz';

@Component({
  selector: 'app-quiz-game-config',
  templateUrl: './quiz-game-config.component.html',
  styleUrls: ['./quiz-game-config.component.less']
})
export class QuizGameConfigComponent implements OnInit {
  quizzes: Quiz[];
  questions: Question[];

  newQuiz: Quiz = {
    id: "",
    name: "",
    description: "",
    questions: []
  };

  newQuestion: Question = {
    id: "",
    type: "select",
    name: "",
    question: "",
    options: [],
    answer: []
  };

  constructor(private api: GamesApiService) { }

  ngOnInit(): void {
    this.api.getQuestions().subscribe(data => {
      console.log("fetch questions", data)
      this.questions = data;
    });
    this.api.getQuizzes().subscribe(data => {
      console.log("fetch quizzes", data)
      this.quizzes = data;
    });
  }

  deleteQuestion(question: Question) {
    this.api.deleteQuestion(question).subscribe(data => {
      console.log("delete question", data)
      // TODO handle true response
      this.questions = this.questions.filter(elem => elem.id !== question.id)
    });
  }

  deleteQuiz(quiz: Quiz) {
    this.api.deleteQuiz(quiz).subscribe(data => {
      console.log("delete quiz", data)
      // TODO handle true response
      this.quizzes = this.quizzes.filter(elem => elem.id !== quiz.id)
    });
  }

  onQuestionChange(question: Question) {
    this.api.updateQuestion(question).subscribe(data => {
      console.log("changed question", data)
      this.questions[this.questions.findIndex(g => {
        return g.id === question.id
      })] = question;
    });
  }

  onQuizChange(quiz: Quiz) {
    this.api.updateQuiz(quiz).subscribe(data => {
      console.log("changed quiz", data)
      this.quizzes[this.quizzes.findIndex(g => {
        return g.id === quiz.id
      })] = quiz;
    });
  }

}
