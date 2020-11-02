import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-games-view',
  templateUrl: './games-view.component.html',
  styleUrls: ['./games-view.component.less']
})
export class GamesViewComponent implements OnInit {

  title = "Task List";
  // to be initialized in the constructor below - service needed
  icebreakers = ["Ice-Breaker Game 1", "Ice-Breaker Game 2"];
  quizzes = ["Quiz 1"];
  others = ["Form 1"];
  constructor() { }

  /*constructor(service : ){
  }*/

  ngOnInit(): void {
  }

}
