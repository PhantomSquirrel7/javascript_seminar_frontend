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
  selectedAliases: Alias[]=[];

  newGame: Alias = {
    id: "-1",
    name: "",
    description: "",
    words: [],
    duration: 120
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
        this.games = this.games.filter(elem => elem.id !== game.id);
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
          return g.id === data.id
        })] = data;
        this.messageService.add("Game '" + game.name + "' updated successfully.", "success");
      }
    });
  }

  resetNewGame() {
    this.newGame = {
      id: "-1",
      name: "",
      description: "",
      words: [],
      duration: 120
    }
  }

  /**
   * adds/removes aliases depending on whether the checkbox is checked or not
   */
  aliasSelected(event, game: Alias) {
    const tempGame : Alias = this.games.filter(x => x.id == game.id)[0];
    if(event.checked)
      this.selectedAliases.push(tempGame) ;
    else
      this.selectedAliases = this.selectedAliases.filter(x => x !== tempGame);
  }
}
