import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { GamesService } from '@app/services/custom/games/games.service';
import { TruthlieUpdate } from '../messages/truthlieUpdate';

@Component({
  selector: 'app-truthlie',
  templateUrl: './truthlie.component.html',
  styleUrls: ['./truthlie.component.less']
})
export class TruthlieComponent implements OnInit, OnDestroy {

  // finished to notify parent component
  @Output() disconnect = new EventEmitter<string>();
  @Input() username: string;
  @Input() sessionId: string;
  @Input() taskId: string;

  truth1 = "";
  truth2 = "";
  lie = "";
  correct: boolean;
  chosen: string;
  timeInterval;
  timer;
  gameUpdateSubscriptionEvent;
  showHelp = false;
  timeRunning = false;
  correctPlayers = [];

  game: TruthlieUpdate;

  constructor(public gamesService: GamesService) {
  }

  ngOnInit(): void {
    this.gameUpdateSubscriptionEvent = this.gamesService.gameUpdateEvent.subscribe(gameUpdate => {
      this.handleRecievedUpdateGame(gameUpdate);
    });
    this.gamesService.sendjoinGame(this.username, this.sessionId, "truthlie", this.taskId);
  }

  ngOnDestroy(): void {
    clearInterval(this.timeInterval);
    this.gameUpdateSubscriptionEvent.unsubscribe();
  }

  startGame(): void {
    this.game.countDownStarted = true;
    this.game.timeleft = this.game.timelimit;
    this.game.state = "running";
    this.game.played.push(this.game.currentPlayer);
    this.game.lie = this.lie;
    this.game.truths = [this.truth1, this.truth2];
    this.game.options = this.shuffle([this.lie, this.truth1, this.truth2]);
    this.sendUpdateGame();
    this.setTimer(this.game.timeleft);
  }

  continueGame(): void {
    this.game.currentPlayer = this.game.players[this.game.played.length];
    this.game.state = 'lobby';
    this.game.timeleft = 30;
    this.game.countDownStarted = false;
    this.game.options = [];
    this.game.guessed = [];
    this.game.lie = "";
    this.game.truths = ["", ""];
    this.sendUpdateGame();
    this.correct = false;
    this.correctPlayers = [];
  }


  setTimer(timeleft): void {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
    this.timeRunning = true;
    this.timer = timeleft;
    if (this.game.state == 'running') {
      this.timeInterval = setInterval(() => {
        if (this.timer > 0) this.timer -= 1;
        if (this.username == this.game.currentPlayer) {
          this.game.timeleft = this.timer;
          this.gamesService.sendUpdate(this.game);
        }
        if (this.timer <= 0) {
          this.onGameOver();
        }
      }, 1000);
    }
  }

  onGameOver(): void {
    clearInterval(this.timeInterval);
    this.timeRunning = false;
    this.game.state = 'result';
    this.game.countDownStarted = false;
    if (this.game.currentPlayer !== this.username && this.chosen === this.game.lie) {
      this.correct = true;
      this.game.guessed[0] = this.username;
    } else {
      if (this.game.played.length < this.game.players.length) {
        this.game.next = true;
      }
      else {
        this.game.next = false;
      }
    }
    this.gamesService.sendUpdate(this.game);
  }

  // Updates the current view with a recieved update
  handleRecievedUpdateGame(truthlieUpdate: TruthlieUpdate) {
    if (this.username === truthlieUpdate.currentPlayer && !this.correctPlayers.includes(truthlieUpdate.guessed[0])) {
      this.correctPlayers.push(truthlieUpdate.guessed[0]);
      truthlieUpdate.guessed = [];
    }
    this.game = truthlieUpdate;
    this.lie = this.game.lie;
    if (this.game.truths && this.game.truths.length == 2) {
      this.truth1 = this.game.truths[0];
      this.truth2 = this.game.truths[1];
    }
    if (this.username != this.game.currentPlayer && this.timer != truthlieUpdate.timeleft) {
      // synchronize timer 
      this.setTimer(truthlieUpdate.timeleft);
    }
    if (!this.timeRunning && truthlieUpdate.countDownStarted) {
      this.setTimer(truthlieUpdate.timeleft);
    }
  }

  sendUpdateGame(): void {
    this.gamesService.sendUpdate(this.game);
  }


  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }


  toggleHelp() {
    this.showHelp = !this.showHelp;
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

  disconnectGame() {
    this.gamesService.sendDisconnect();
    this.disconnect.emit("disconnect");
  }

}
