import { Component, OnInit, Input, isDevMode } from '@angular/core';
import { GamesService } from '@app/services/custom/games/games.service';

@Component({
  selector: 'app-games-student-content',
  templateUrl: './games-student-content.component.html',
  styleUrls: ['./games-student-content.component.css']
})
export class GamesStudentContentComponent implements OnInit {

  constructor(private gamesService : GamesService) { 
    
    this.gamesService.sendData("ASD");
  }

  debugMessage: String = "";
  devMode = isDevMode();
  selectedGame : String = "quiz";
  gameJoined : boolean = false
  @Input() sessionId: String;
  @Input() username: String;

  ngOnInit(): void {
  }
  
  public onJoinGameButton() {
    this.debugMessage = "Joining Game as " + this.username + " in Session " + this.sessionId + this.selectedGame;
    this.gameJoined = true;
    // Disconnect after 2 seconds
    // setTimeout( () => {
    //   this.onDisconnect();
    //   this.debugMessage = "Disconnected after Timeout"
    // }, 2000);

  }

  isSelected(game){
    return game == this.selectedGame;
  }

  onDisconnect() {
    this.gameJoined = false;
    this.debugMessage = "Disconnected";
  }

  onFinished() {
    console.log("Game Finished");
  }

}
