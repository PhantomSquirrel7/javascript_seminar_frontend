import { Component, Input, OnInit } from '@angular/core';
import { Alias } from '@app/models/game-models/alias';
import { DrawIt } from '@app/models/game-models/drawIt';
import { Quiz } from '@app/models/game-models/quiz';
import { SimpleTask } from '@app/models/game-models/simpleTask';

@Component({
  selector: 'app-games-student-content',
  templateUrl: './games-student-content.component.html',
  styleUrls: ['./games-student-content.component.css']
})
export class GamesStudentContentComponent implements OnInit {

  @Input() selectedMeeting: any;
  constructor() {

  }
  // for task list
  public selectedAliases: Alias[] = [];
  public selectedQuizzes: Quiz[] = [];
  public selectedDrawIts: DrawIt[] = [];
  public simpleTasks: SimpleTask[] = [];
  // end of task list attributes

  selectedGame: String = "quiz";
  gameJoined: boolean = false;
  taskId: string = "taskId";
  username = "Username";
  sessionId = "sessionId";

  ngOnInit(): void {
    this.selectedAliases = this.selectedMeeting.taskList.aliases;
    this.selectedQuizzes = this.selectedMeeting.taskList.quizzes;
    this.selectedDrawIts = this.selectedMeeting.taskList.drawits;
    this.simpleTasks = this.selectedMeeting.taskList.simpleTasks;
  }

  public onJoinGameButton() {
    this.gameJoined = true;

    // TODO: initialize attributes correctly (username+sessionId=roomId) to pass them to the games workflow
    //this.taskId = game.id;
    //this.username = ...;
    //this.sessionId = ...;
  }

  isSelected(game) {
    return game == this.selectedGame;
  }

  onDisconnect(event: string = "") {
    this.gameJoined = false;
  }
}

