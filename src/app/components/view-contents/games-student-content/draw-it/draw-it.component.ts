import { Component, Input, OnDestroy, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { GamesService } from '@app/services/custom/games/games.service';
import { DrawItUpdate } from '../messages/drawItUpdate';
import { CanvasWhiteboardComponent, CanvasWhiteboardOptions, CanvasWhiteboardService } from 'ng2-canvas-whiteboard';

@Component({
  selector: 'app-draw-it',
  viewProviders: [CanvasWhiteboardComponent],
  templateUrl: './draw-it.component.html',
  styleUrls: ['./draw-it.component.css']
})

export class DrawItComponent implements OnInit, OnDestroy {

  @ViewChild('canvasWhiteboard') canvasWhiteboard: CanvasWhiteboardComponent;

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
  firstUpdate = false;

  game: DrawItUpdate;

  canvasOptionsDraw: CanvasWhiteboardOptions = {
    drawButtonEnabled: false,
    drawButtonText: "Draw",
    clearButtonEnabled: true,
    clearButtonText: "Clear",
    undoButtonText: "Undo",
    undoButtonEnabled: true,
    redoButtonText: "Redo",
    redoButtonEnabled: true,
    colorPickerEnabled: true,
    fillColorPickerText: "Fill",
    strokeColorPickerText: "Stroke",
    saveDataButtonEnabled: false,
    saveDataButtonText: "Save",
    lineWidth: 2,
    strokeColor: "rgb(0,0,0)",
    shouldDownloadDrawing: true,
    drawingEnabled: true,
    batchUpdateTimeoutDuration: 100,
    aspectRatio: 0.75
  };

  canvasOptionsGuess: CanvasWhiteboardOptions = {
    drawButtonEnabled: false,
    clearButtonEnabled: false,
    undoButtonEnabled: false,
    redoButtonEnabled: false,
    colorPickerEnabled: false,
    fillColorPickerEnabled: false,
    saveDataButtonEnabled: false,
    shouldDownloadDrawing: false,
    drawingEnabled: false,
    shapeSelectorEnabled: false,
    showShapeSelector: false,
    strokeColorPickerEnabled: false,
    showStrokeColorPicker: false,
    showFillColorPicker: false,
    aspectRatio: 0.75
  };

  constructor(public gamesService: GamesService, private _canvasWhiteboardService: CanvasWhiteboardService) {
  }

  ngOnInit(): void {
    this.gameUpdateSubscriptionEvent = this.gamesService.gameUpdateEvent.subscribe(gameUpdate => {
      if (gameUpdate && this.gamesService) this.updateGame(gameUpdate);
    });
    this.gamesService.sendjoinGame(this.username, this.sessionId, "drawit", this.taskId);
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

  updateGame(gameUpdate: DrawItUpdate) {
    let drawing = null;
    if (gameUpdate.drawing) {
      drawing = gameUpdate.drawing;
      gameUpdate.drawing = null;
    }
    this.game = gameUpdate;
    // get canvas history on rejoin 
    if (!this.firstUpdate && gameUpdate.drawingHistory.length > 0) {
      this.firstUpdate = true;
      setTimeout(() => {
        this.setWholeCanvas(gameUpdate.drawingHistory);
      }, 200)

    }

    if (this.username != this.game.currentPlayer) {
      // synchronize timer 
      if (this.timer != gameUpdate.timeleft) {
        this.setTimer(gameUpdate.timeleft);
      }
      if (drawing) this.handleCanvasUpdate(drawing);
    }
    if (this.timeRunning == false && gameUpdate.countDownStarted == true) {
      this.setTimer(gameUpdate.timeleft);
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
    // this.sleep(950)
    //   .then(() => {
    this.timeInterval = setInterval(() => {
      if (this.timer > 0) this.timer -= 1;
      //current player is reference for timer and initializes game over
      if (this.username == this.game.currentPlayer) {
        this.game.timeleft = this.timer;
        this.game.drawing = null;
        this.gamesService.sendUpdate(this.game);
        if (this.timer <= 0) {
          this.onGameOver();
        }
      }
    }, 1000);
    // })
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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

  // Canvas Events
  onCanvasDraw(event) {
    if (!this.firstUpdate) this.firstUpdate = true;
    this.gamesService.sendUpdate({ ...this.game, drawing: { type: 'draw', data: event } });
  }

  onCanvasClear() {
    this.gamesService.sendUpdate({ ...this.game, drawing: { type: 'clear' } });
  }

  onCanvasUndo(event) {
    this.gamesService.sendUpdate({ ...this.game, drawing: { type: 'undo', UUID: event } });
  }

  onCanvasRedo(event) {
    this.gamesService.sendUpdate({ ...this.game, drawing: { type: 'redo', UUID: event } });
  }

  // receive canvas event
  handleCanvasUpdate(newMessage: any): void {
    if (this.username == this.game.currentPlayer || this.game.state == "over") {
      return;
    }
    //update for guessing players only
    //console.log(newMessage)
    switch (newMessage.type) {
      case "draw":
        let updates = newMessage.data;
        this._canvasWhiteboardService.drawCanvas(updates);
        break;
      case "clear":
        this._canvasWhiteboardService.clearCanvas();
        break;
      case "undo":
        this._canvasWhiteboardService.undoCanvas(newMessage.UUID);
        break;
      case "redo":
        this._canvasWhiteboardService.redoCanvas(newMessage.UUID);
        break;
    }
  }

  setWholeCanvas(history: Array<any>): void {
    this._canvasWhiteboardService.clearCanvas();
    history.forEach(newMessage => {
      switch (newMessage.type) {
        case "draw":
          let updates = newMessage.data;
          this._canvasWhiteboardService.drawCanvas(updates);
          break;
        case "clear":
          this._canvasWhiteboardService.clearCanvas();
          break;
        case "undo":
          this._canvasWhiteboardService.undoCanvas(newMessage.UUID);
          break;
        case "redo":
          this._canvasWhiteboardService.redoCanvas(newMessage.UUID);
          break;
      }
    });
  }
}
