import { Component, OnInit } from '@angular/core';
import { GamesApiService } from '@app/services/custom/games/games-api.service';
import { Alias } from '@app/models/game-models/alias';
import { MessageService } from '@app/services/custom/messages/message.service';

@Component({
  selector: 'app-alias-game-config',
  templateUrl: './alias-game-config.component.html',
  styleUrls: ['./alias-game-config.component.less']
})
export class AliasGameConfigComponent implements OnInit {
  games: Alias[];

  newGame: Alias = {
    _id: "-1",
    name: "",
    description: "",
    words: []
  };

  constructor(private api: GamesApiService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.api.getAliasGames().subscribe(data => {
      //console.log("fetch alias", data)
      this.games = data;
    });
  }

  deleteGame(game: Alias) {
    this.api.deleteAliasGame(game).subscribe(data => {
      if (data) {
        //console.log("delete game", data)
        this.games = this.games.filter(elem => elem._id !== game._id);
        this.messageService.add("Game '" + game.name + "' was deleted.", "success");
      }
    });
  }

  onCreateGame(game: Alias) {
    this.api.createAliasGame(game).subscribe(data => {
      if (data) {
        //console.log("create game", data)
        this.games.push(data);
        this.resetNewGame();
        this.messageService.add("Game '" + game.name + "' was created.", "success");
      }
    });
  }

  onGameChange(game: Alias) {
    this.api.updateAliasGame(game).subscribe(data => {
      if (data) {
        //console.log("changed game", data)
        this.games[this.games.findIndex(g => {
          return g._id === data._id
        })] = data;
        this.messageService.add("Game '" + game.name + "' updated successfully.", "success");
      }
    });
  }

  resetNewGame() {
    this.newGame = {
      _id: "-1",
      name: "",
      description: "",
      words: []
    }
  }
}
