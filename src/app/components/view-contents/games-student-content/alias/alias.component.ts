import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { GamesService } from '@app/services/custom/games/games.service';
import { AliasUpdate } from '../messages/aliasUpdate';

@Component({
  selector: 'app-alias',
  templateUrl: './alias.component.html',
  styleUrls: ['./alias.component.css']
})
export class GamesAliasComponent implements OnInit, OnDestroy {

  // finished to notify parent component
  @Output() disconnect = new EventEmitter<string>();
  @Input() username: string;
  @Input() sessionId: string;
  @Input() taskId: string;

  currentWord = "";
  currentWordIndex = 0;
  timeInterval;
  timer;
  gameUpdateSubscriptionEvent;
  showHelp = false;
  timeRunning = false;

  game: AliasUpdate;

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
    clearInterval(this.timeInterval);
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

  updateGame(gameUpdate: AliasUpdate) {
    if (this.gamesService == undefined) {
      return;
    }
    this.game = gameUpdate;

    if (this.username != this.game.currentPlayer) {
      // synchronize timer 
      if (this.timer != gameUpdate.timeleft) {
        this.setTimer(gameUpdate.timeleft);
      }
    }
    if (!this.timeRunning && gameUpdate.countDownStarted) {
      this.setTimer(gameUpdate.timeleft);
    }
    if (this.username == this.game.currentPlayer && this.timeRunning && this.currentWord == "") {
      this.currentWord = this.game.words[0];
    }
  }


  // Starts a game Session
  startGame(): void {
    this.game.countDownStarted = true;
    this.game.state = "running";
    this.currentWord = this.game.words[0];
    this.gamesService.sendUpdate(this.game);
    this.setTimer(this.game.timeleft);
  }

  onGameOver(): void {
    clearInterval(this.timeInterval);
    this.game.state = "over";
    this.gamesService.sendUpdate(this.game);
  }

  setTimer(timeleft): void {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
    this.timeRunning = true;
    this.timer = timeleft;
    this.timeInterval = setInterval(() => {
      if (this.timer > 0) this.timer -= 1;
      //current player is reference for timer and initializes game over
      if (this.username == this.game.currentPlayer) {
        this.game.timeleft = this.timer;
        this.gamesService.sendUpdate(this.game);
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
    this.gamesService.sendDisconnect();
    this.disconnect.emit("disconnect");
  }
}
