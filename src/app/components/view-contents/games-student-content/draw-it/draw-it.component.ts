import { Component, Input, Output, OnDestroy, OnInit, EventEmitter } from '@angular/core';
import { GamesService } from '@app/services/custom/games/games.service';
import { DrawItUpdate } from '../messages/drawItUpdate';

@Component({
  selector: 'app-draw-it',
  templateUrl: './draw-it.component.html',
  styleUrls: ['./draw-it.component.css']
})

export class DrawItComponent implements OnInit, OnDestroy {

  @Input() username: string;
  @Input() sessionId: string;
  @Input() taskId: string;
  @Output() disconnect: EventEmitter<string> = new EventEmitter<string>();

  currentWord = "";
  currentWordIndex = 0;
  timeInterval;
  timer;
  gameUpdateSubscriptionEvent;
  showHelp = false;

  game: DrawItUpdate;

  constructor(public gamesService: GamesService) {
  }

  ngOnInit(): void {
    this.gameUpdateSubscriptionEvent = this.gamesService.gameUpdateEvent.subscribe(gameUpdate => {
      this.updateGame(gameUpdate);
    });
    this.gamesService.sendjoinGame(this.username, this.sessionId, "alias", this.taskId);
  }

  // Remove self from players List, Send update and unsubscribe to changes
  ngOnDestroy(): void {
    //let session: AliasUpdate = this.gamesService.gameSession;
    this.game.players = this.game.players.filter(playerName => playerName !== this.username);
    this.gamesService.sendUpdate(this.game);
    this.gameUpdateSubscriptionEvent.unsubscribe();
  }

  get countdown() {
    let minutes = Math.floor(this.timer / 60);
    let min;
    if (minutes < 10) {
      min = `0${minutes}`;
    } else {
      min = minutes;
    }
    let seconds = this.timer % 60;
    let sec;
    if (seconds < 10) {
      sec = `0${seconds}`;
    } else {
      sec = seconds;
    }
    return `${min}:${sec}`
  }

  updateGame(gameUpdate: DrawItUpdate) {
    if (this.gamesService == undefined) {
      return;
    }
    if (this.game) {
      if (this.username != this.game.currentPlayer) {
        this.timer = gameUpdate.timeleft;
      }
      if (this.game.countDownStarted == false && gameUpdate.countDownStarted == true) {
        console.log("STARTED GAME", this.game.words)
        this.setTimer();
      }
      this.game = gameUpdate;
    } else {
      this.game = gameUpdate;
      this.timer = this.game.timelimit;
    }
  }

  // Starts a game Session
  startGame(): void {
    this.game.countDownStarted = true;
    this.game.state = "running";
    this.currentWord = this.game.words[0];
    this.gamesService.sendUpdate(this.game);
    this.setTimer();
  }

  onGameOver(): void {
    clearInterval(this.timeInterval);
    this.game.state = "over";
    this.gamesService.sendUpdate(this.game);
  }

  setTimer(): void {
    this.timeInterval = setInterval(() => {
      if (this.timer > 0) this.timer -= 1;
      //current player is reference for timer and initializes game over
      if (this.username == this.game.currentPlayer) {
        this.game.timeleft = this.timer;
        if (this.timer <= 0) {
          this.onGameOver();
        }
      }
    }, 1000);
  }

  /*
  On a correct guess it will serve a new word, or end the game if all words have been guessed.
  The number of correct guesses will be synchronized across the network.
  */
  correctGuess(): void {
    this.game.words = this.game.words.filter(word =>
      word !== this.currentWord
    );

    this.currentWord = this.game.words[(this.currentWordIndex) % this.game.words.length];
    this.game.numberOfGuessedWords++;
    if (this.game.words.length === 0) {
      this.onGameOver();
    }
    this.gamesService.sendUpdate(this.game);
  }

  skipWord(): void {
    this.currentWordIndex = (this.currentWordIndex + 1) % this.game.words.length;
    this.currentWord = this.game.words[this.currentWordIndex];
  }

  toggleHelp() {
    this.showHelp = !this.showHelp;
  }

  disconnectGame() {
    this.disconnect.emit("disconnect");
  }
}
