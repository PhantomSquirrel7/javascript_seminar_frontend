import { Component, OnInit } from '@angular/core';
import { SimpleTask } from '@app/models/game-models/simpleTask';
import { GamesApiService } from '@app/services/custom/games/games-api.service';
import { MessageService } from '@app/services/custom/messages/message.service';

@Component({
  selector: 'app-simple-task-config',
  templateUrl: './simple-task-config.component.html',
  styleUrls: ['./simple-task-config.component.less']
})
export class SimpleTaskConfigComponent implements OnInit {

  games: SimpleTask[] = [{id : "-1", name: "Task1", description:"desc"}];
  selectedTasks : SimpleTask[] = [];

  newTask: SimpleTask = {
    id: "-1",
    name: "",
    description: ""
  };

  constructor(private api: GamesApiService, private messageService: MessageService) { }

  ngOnInit(): void {
    /*this.api.getSimpleTasks().subscribe(data => {
      //console.log("fetch alias", data)
      this.games = data;
    });*/
  }

  deleteGame(game: SimpleTask) {
    this.api.deleteSimpleTask(game).subscribe(data => {
      if (data) {
        //console.log("delete game", data)
        this.games = this.games.filter(elem => elem.id !== game.id);
        this.messageService.add("Simple Task '" + game.name + "' was deleted.", "success");
      }
    });
  }

  onCreateGame(game: SimpleTask) {
    this.api.createSimpleTask(game).subscribe(data => {
      if (data) {
        //console.log("create game", data)
        this.games.push(data);
        this.resetNewGame();
        this.messageService.add("Simple Task '" + game.name + "' was created.", "success");
      }
    });
  }

  onGameChange(game: SimpleTask) {
    this.api.updateSimpleTask(game).subscribe(data => {
      if (data) {
        //console.log("changed game", data)
        this.games[this.games.findIndex(g => {
          return g.id === data.id
        })] = data;
        this.messageService.add("Simple Task '" + game.name + "' updated successfully.", "success");
      }
    });
  }

  resetNewGame() {
    this.newTask = {
      id: "-1",
      name: "",
      description: ""
    }
  }

}
