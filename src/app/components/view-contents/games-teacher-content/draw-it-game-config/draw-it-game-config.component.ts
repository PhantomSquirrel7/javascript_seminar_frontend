import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GamesApiService } from '@app/services/custom/games/games-api.service';
import { DrawIt } from '@app/models/game-models/drawIt';
import { MessageService } from '@app/services/custom/messages/message.service';

@Component({
  selector: 'app-draw-it-game-config',
  templateUrl: './draw-it-game-config.component.html',
  styleUrls: ['./draw-it-game-config.component.less']
})
export class DrawItGameConfigComponent implements OnInit {

  @Input() isPlanMeetingView: boolean;
  @Output() selectedDrawItsEvent: EventEmitter<DrawIt[]> = new EventEmitter<DrawIt[]>();

  games: DrawIt[];
  selectedGames: DrawIt[];

  newGame: DrawIt = {
    id: "-1",
    name: "",
    description: "",
    words: [],
    duration: 120
  };

  constructor(private api: GamesApiService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.api.getDrawItGames().subscribe(data => {
      //console.log("fetch draw it games", data)
      this.games = data;
    });
    this.selectedGames = this.api.getSelectedDrawIts();
  }

  deleteGame(game: DrawIt) {
    this.api.deleteDrawItGame(game).subscribe(data => {
      if (data) {
        //console.log("delete game", data)
        this.games = this.games.filter(elem => elem.id !== game.id);
        this.messageService.add("Game '" + game.name + "' was deleted.", "success");
      }
    });
    this.api.deleteSelectedDrawIt(this.games.filter(x => x.id == game.id)[0]);
    this.selectedGames = this.api.getSelectedDrawIts();
    this.selectedDrawItsEvent.emit(this.selectedGames);
  }

  onCreateGame(game: DrawIt) {
    this.api.createDrawItGame(game).subscribe(data => {
      if (data) {
        //console.log("create game", data)
        this.games.push(data);
        this.resetNewGame();
        this.messageService.add("Game '" + game.name + "' was created.", "success");
      }
    });
  }

  onGameChange(game: DrawIt) {
    this.api.updateDrawItGame(game).subscribe(data => {
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
  drawItSelected(event, game: DrawIt) {
    const tempGame: DrawIt = this.games.filter(x => x.id == game.id)[0];
    if (event.checked)
      this.api.createSelectedDrawIt(tempGame);
    else
      this.api.deleteSelectedDrawIt(tempGame);
    this.selectedGames = this.api.getSelectedDrawIts();
    this.selectedDrawItsEvent.emit(this.selectedGames);

  }

  boxChecked(game: DrawIt) {
    var elementPos = this.api.getSelectedDrawIts().map(function (x) { return x.id; }).indexOf(game.id);
    return elementPos > -1;
  }
}
