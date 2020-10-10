import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { GamesService } from '@app/services/custom/games/games.service';
import { AliasUpdate } from '../messages/aliasUpdate';

@Component({
  selector: 'app-alias',
  templateUrl: './alias.component.html',
  styleUrls: ['./alias.component.css']
})
export class GamesAliasComponent implements OnInit, OnDestroy {

  @Input() username: string;
  @Input() sessionId: string;

  currentPlayer: string;
  playerList: string[] = [];
  words: string[] = ["Banane", "Apfel", "Krankenwagen"];
  currentWord = "";
  currentWordIndex = 0;
  timeLeftSeconds: number = 10;
  gameStarted: boolean = false;
  timelimit: number = 10;
  timeInterval;
  gameUpdateSubscriptionEvent;
  numberOfGuessedWords: number = 0;
  countDownStarted: boolean = false;
  gameType : string = "alias";

  constructor(public gamesService: GamesService) {
  }

  ngOnInit(): void {
    this.gameUpdateSubscriptionEvent = this.gamesService.gameUpdateEvent.subscribe(gameState => {
      this.updateGame(gameState);
    });
    this.gamesService.joinGame(this.username, this.sessionId, "alias");
  }

  ngOnDestroy(): void {
    this.gameUpdateSubscriptionEvent.unsubscribe();
  }

  updateGame(gameSession : AliasUpdate) {
    console.log("Recieved Gamestate that should be updated: " + JSON.stringify(gameSession));
    if (this.gamesService != undefined) {
      this.playerList = gameSession.players;
      this.currentPlayer = gameSession.currentPlayer;
      this.numberOfGuessedWords = gameSession.numberOfGuessedWords;

      if (this.countDownStarted == false && gameSession.countDownStarted == true) {
        this.countDownStarted = true;
        this.setTimer();
      }
    }

    console.log(this.username);
    console.log(this.currentPlayer);
    console.log(gameSession.currentPlayer);
    console.log(this.username == this.currentPlayer);

  }

  startGame(): void {
    this.words = ["Banane", "Apfel", "Krankenwagen"]
    this.gamesService.gameSession.countDownStarted = true;
    this.countDownStarted = true;
    this.gamesService.sendUpdate();
    this.gameStarted = true;
    this.setTimer();
    this.currentWord = this.words[0];
  }

  onGameOver(): void {
    this.gameStarted = false;
    clearInterval(this.timeInterval);
  }

  setTimer(): void {
    console.log("SET TIMER");
    this.timeLeftSeconds = 10;
    this.timeInterval = setInterval(() => {
      this.timeLeftSeconds -= 1;
      if (this.timeLeftSeconds <= 0) {
        this.onGameOver();
      }
    }, 1000);
  }

  /*
  On a correct guess it will serve a new word, or end the game if all words have been guessed.
  The number of correct guesses will be synchronized across the network.
  */
  correctGuess(): void {
    this.words = this.words.filter(word =>
      word !== this.currentWord
    );
    if (this.words.length === 0) {
      this.onGameOver();
    }
    this.currentWord = this.words[(this.currentWordIndex) % this.words.length];
    this.gamesService.gameSession.numberOfGuessedWords++;
    this.numberOfGuessedWords++;
    this.gamesService.sendUpdate();
  }

  skipWord(): void {
    this.currentWordIndex++;
    this.currentWord = this.words[(this.currentWordIndex) % this.words.length];
  }

}
