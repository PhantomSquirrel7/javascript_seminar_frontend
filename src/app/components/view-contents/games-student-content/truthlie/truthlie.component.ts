import { Component, Input, Output, OnDestroy, OnInit, EventEmitter } from '@angular/core';
import { GamesService } from '@app/services/custom/games/games.service';
import { TruthlieUpdate } from '../messages/truthlieUpdate';

@Component({
  selector: 'app-truthlie',
  templateUrl: './truthlie.component.html',
  styleUrls: ['./truthlie.component.less']
})
export class TruthlieComponent implements OnInit, OnDestroy {
  @Input() username: string;
  @Input() sessionId: string;
  @Input() taskId: string;
  @Output() disconnect: EventEmitter<string> = new EventEmitter<string>();


  truth1: string;
  truth2: string;
  lie: string;
  correct: boolean;
  chosen: string;
  timeInterval;
  timer;
  gameUpdateSubscriptionEvent;
  showHelp = false;

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
    this.game.players = this.game.players.filter(playerName => playerName !== this.username);
    this.gamesService.sendUpdate(this.game);
    this.gameUpdateSubscriptionEvent.unsubscribe();
  }

  startGame(): void {
    this.game.countDownStarted = true;
    this.game.timeleft = this.game.timelimit;
    this.game.state = "running";
    this.game.played.push(this.game.currentPlayer);
    this.game.lie = this.lie;
    this.game.options = this.shuffle([this.lie, this.truth1, this.truth2]);
    this.timer = this.game.timelimit;
    this.sendUpdateGame();
    this.setTimer();

  }

  continueGame(): void {
    this.game.currentPlayer = this.game.players[this.game.played.length];
    this.game.state = 'lobby';
    this.game.timeleft = 30;
    this.game.countDownStarted = false;
    this.game.options = [];
    this.game.guessed = [];
    this.sendUpdateGame();
    this.correct = false;
  }


  setTimer(): void {
    this.timeInterval = setInterval(() => {
      if (this.game.state == 'running') {
        if (this.timer > 0) this.timer -= 1;
        this.game.timeleft = this.timer;
        if (this.timer <= 0) {
          this.onGameOver();
        }
      }
    }, 1000);
  }

  onGameOver(): void {
    clearInterval(this.timeInterval);
    if (this.game.currentPlayer !== this.username && this.chosen === this.game.lie) {
      this.correct = true;
      this.game.guessed[0] = this.username;
      this.game.state = 'result';
      this.game.countDownStarted = false;
    } else {
      this.game.state = 'result';
      this.game.countDownStarted = false;
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
    if (truthlieUpdate.state === "result" && this.username === truthlieUpdate.currentPlayer) {
      this.game.guessed.push(truthlieUpdate.guessed[0]);
    }
    else if (truthlieUpdate.state === "result") { }
    else {
      if (this.game) {
        if (this.game.countDownStarted == false && truthlieUpdate.countDownStarted) {
          // Start Countdown Now!
          this.timer = this.game.timelimit;
          this.setTimer();
        }
        this.game = truthlieUpdate;
      }
      else {
        this.game = truthlieUpdate;
        this.timer = this.game.timelimit;
      }
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
    this.disconnect.emit("disconnect");
  }

}
