import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SimpleTask } from '@app/models/game-models/simpleTask';
import { GamesApiService } from '@app/services/custom/games/games-api.service';
import { MessageService } from '@app/services/custom/messages/message.service';

@Component({
  selector: 'app-simple-task-config',
  templateUrl: './simple-task-config.component.html',
  styleUrls: ['./simple-task-config.component.less']
})
export class SimpleTaskConfigComponent implements OnInit {

  @Output() simpleTasksEvent: EventEmitter<SimpleTask[]> = new EventEmitter<SimpleTask[]>();

  games: SimpleTask[] = [];
  id: number = this.api.getMaxTaskId() + 1;

  newTask: SimpleTask = {
    id: this.id.toString(),
    name: "",
    description: ""
  };

  constructor(private api: GamesApiService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.games = this.api.getSimpleTasks();
  }

  deleteGame(game: SimpleTask) {
    this.api.deleteSimpleTask(this.games.filter(x => x.id == game.id)[0]);
    this.games = this.api.getSimpleTasks();
    this.simpleTasksEvent.emit(this.games);
  }

  onCreateGame(game: SimpleTask) {
    this.api.createSimpleTask(game);
    this.resetNewGame();
    this.games = this.api.getSimpleTasks();
    this.simpleTasksEvent.emit(this.games);
  }

  onGameChange(game: SimpleTask) {
    this.api.updateSimpleTask(game);
    this.games = this.api.getSimpleTasks();
    this.simpleTasksEvent.emit(this.games);
  }

  resetNewGame() {
    this.newTask = {
      id: this.nextId().toString(),
      name: "",
      description: ""
    }
  }

  /**
   * generation of task ids (simple tasks are not stored as SimpleTask object in the database)
   * by incrementing this.id every time the user creates a new simple task
   */
  nextId() {
    this.id++;
    return this.id;
  };

}
