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
    answers: []
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

/*   deleteGame(game: Alias) {
    this.api.deleteAliasGame(game).subscribe(data => {
      console.log("delete game", data)
      // TODO handle true response
      this.games = this.games.filter(elem => elem.id !== game.id)
    });
  }

  onCreateGame(game: Alias) {
    this.api.createAliasGame(game).subscribe(data => {
      console.log("created game", data)
      // TODO handle true response
      this.games.push(game);
      this.resetNewGame();
    });
  }

  onGameChange(game: Alias) {
    this.api.updateAliasGame(game).subscribe(data => {
      console.log("changed", data)
      this.games[this.games.findIndex(g => {
        return g.id === game.id
      })] = game;
    });
  }

  resetNewGame() {
    this.newGame = {
      id: 0,
      name: "",
      description: "",
      words: []
    }
  } */
}
