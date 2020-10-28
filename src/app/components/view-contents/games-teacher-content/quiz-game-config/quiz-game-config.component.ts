import { Component, OnInit } from '@angular/core';
import { GamesApiService } from '@app/services/custom/games/games-api.service';
import { Question } from '@app/models/game-models/question';
import { Quiz } from '@app/models/game-models/quiz';
import { MessageService } from '@app/services/custom/messages/message.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-quiz-game-config',
  templateUrl: './quiz-game-config.component.html',
  styleUrls: ['./quiz-game-config.component.less']
})
export class QuizGameConfigComponent implements OnInit {
  quizzes: Quiz[];
  questions: Question[];

  newQuiz: Quiz = {
    _id: "-1",
    name: "",
    description: "",
    questions: []
  };

  newQuestion: Question = {
    _id: "-1",
    type: "select",
    name: "",
    question: "",
    options: [],
    answer: []
  };

  requestDelete = "";

  constructor(private api: GamesApiService, private messageService: MessageService, public deleteDialog: MatDialog) { }

  ngOnInit(): void {
    this.api.getQuestions().subscribe(data => {
      //console.log("fetch questions", data)
      this.questions = data;
    });
    this.api.getQuizzes().subscribe(data => {
      //console.log("fetch quizzes", data)
      this.quizzes = data;
    });
  }

  requestDeleteQuestion(question: Question) {
    this.requestDelete = question._id;
  }

  cancelRequestDelete() {
    this.requestDelete = "";
  }

  deleteQuestion(question: Question) {
    this.api.deleteQuestion(question).subscribe(data => {
      if (data) {
        //console.log("delete question", data)
        this.questions = this.questions.filter(elem => elem._id !== question._id);
        this.messageService.add("Question '" + question.name + "' was deleted.", "success");
        this.requestDelete = "";

        //get quiz update with removed question
        this.api.getQuizzes().subscribe(data => {
          //console.log("fetch quizzes", data)
          this.quizzes = data;

        });
      }
    });
  }

  deleteQuiz(quiz: Quiz) {
    this.api.deleteQuiz(quiz).subscribe(data => {
      if (data) {
        //console.log("delete quiz", data)
        this.quizzes = this.quizzes.filter(elem => elem._id !== quiz._id);
        this.messageService.add("Quiz '" + quiz.name + "' was deleted.", "success");
      }
    });
  }

  onCreateQuestion(question: Question) {
    this.api.createQuestion(question).subscribe(data => {
      if (data) {
        this.questions = [...this.questions, data];
        this.resetNewQuestion();
        this.messageService.add("New Question created: " + question.name, "success");
      }
    });
  }

  onCreateQuiz(quiz: Quiz) {
    this.api.createQuiz(quiz).subscribe(data => {
      if (data) {
        this.quizzes.push(data);
        this.resetNewQuestion();
        this.messageService.add("New Quiz created: " + quiz.name, "success");
      }
    });
  }

  onQuestionChange(question: Question) {
    this.api.updateQuestion(question).subscribe(data => {
      if (data) {
        //console.log("changed question", data)
        this.questions[this.questions.findIndex(g => {
          return g._id === question._id
        })] = data;
        this.messageService.add("Question '" + question.name + "' updated successfully.", "success");
      }
    });
  }

  onQuizChange(quiz: Quiz) {
    this.api.updateQuiz(quiz).subscribe(data => {
      if (data) {
        //console.log("changed quiz", data)
        this.quizzes[this.quizzes.findIndex(g => {
          return g._id === quiz._id
        })] = data;
        this.messageService.add("Quiz '" + quiz.name + "' updated successfully.", "success");
      }
    });
  }

  resetNewQuestion() {
    this.newQuestion = {
      _id: "-1",
      type: "select",
      name: "",
      question: "",
      options: [],
      answer: []
    }
  }

  resetNewQuiz() {
    this.newQuiz = {
      _id: "-1",
      name: "",
      description: "",
      questions: []
    }
  }
}
