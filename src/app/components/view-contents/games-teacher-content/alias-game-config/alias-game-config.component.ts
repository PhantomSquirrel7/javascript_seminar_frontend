import { Component, OnInit } from '@angular/core';
import { GamesApiService } from '@app/services/custom/games/games-api.service';
import { Alias } from '@app/models/game-models/alias';

@Component({
  selector: 'app-alias-game-config',
  templateUrl: './alias-game-config.component.html',
  styleUrls: ['./alias-game-config.component.less']
})
export class AliasGameConfigComponent implements OnInit {
  games: Alias[];

  newGame: Alias = {
    id: "23123",
    name: "",
    description: "",
    words: []
  };

  created: boolean = false;

  constructor(private api: GamesApiService) { }

  ngOnInit(): void {
    this.api.getAliasGames().subscribe(data => {
      console.log("fetch data", data)
      this.games = data;
    });
  }

  deleteGame(game: Alias) {
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
      id: "3242334",
      name: "",
      description: "",
      words: []
    }
  }
}
