import { Component, Input, OnInit } from '@angular/core';
import { GamesService } from '@app/services/custom/games/games.service';

@Component({
  selector: 'app-alias',
  templateUrl: './alias.component.html',
  styleUrls: ['./alias.component.css']
})
export class GamesAliasComponent implements OnInit {

  @Input() username : string;
  @Input() sessionId : string;

  isPlayer: boolean = true;
  currentPlayer : string = "Peter";
  playerList : string[] = ["Patrick", "Anna","Michaela"]
  words: string[] = ["Banane", "Apfel", "Krankenwagen"]
  currentWord = ""
  currentWordIndex = 0;
  timeLeftSeconds: number = 10;
  gameStarted: boolean = false;
  timelimit: number = 10;
  timeInterval;

  constructor(public gamesService : GamesService) {
   }

  ngOnInit(): void {
    this.gamesService.joinGame(this.username, this.sessionId, "quiz");
  }

  startGame(): void {
    this.words = ["Banane", "Apfel", "Krankenwagen"]
    this.gameStarted = true;
    this.setTimer();
    this.currentWord = this.words[0];
  }

  onGameOver(): void {
    this.gameStarted = false;
    clearInterval(this.timeInterval);
  }

  setTimer(): void {
    this.timeLeftSeconds = 10;
    this.timeInterval = setInterval(() => {
      this.timeLeftSeconds -= 1;
      if (this.timeLeftSeconds <= 0) {
        this.onGameOver();
      }
    }, 1000);
  }

  correctGuess(): void {
    this.words = this.words.filter(word => 
      word !== this.currentWord
    );
    if (this.words.length === 0){
      this.onGameOver();
    }
    this.currentWord = this.words[(this.currentWordIndex) % this.words.length];
  }


  skipWord(): void {
    this.currentWordIndex++;
    this.currentWord = this.words[(this.currentWordIndex) % this.words.length];
  }

}
