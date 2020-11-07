import { Component, OnInit } from '@angular/core';
import { Quiz } from '@app/models/game-models/quiz';
import { GamesApiService } from '@app/services/custom/games/games-api.service';

/*
    Quizzes
    Alias Games
    Draw-It Games
    2T1L
    Simple Tasks
*/

@Component({
  selector: 'app-games-view',
  templateUrl: './games-view.component.html',
  styleUrls: ['./games-view.component.less']
})
export class GamesViewComponent implements OnInit {

  title = "Task List";

  // to be initialized in the ngOnInit() function below
  quizzes: Quiz[];
  //you do the rest
  aliasGames = ["Placeholder Alias"];
  drawItGames = ["Placeholder Draw-It1", "Placeholder Draw-It2"];
  twoTruthsGames = ["Placeholder 2T1L"];
  // simple tasks are not implemented yet

  constructor(private api: GamesApiService){}

  ngOnInit(): void {
    this.api.getQuizzes().subscribe(data => {
      this.quizzes = data;
    });
  }
}
