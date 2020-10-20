import { Component, Input, Output, OnDestroy, OnInit, EventEmitter } from '@angular/core';
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
  @Input() taskId: string;
  @Output() disconnect: EventEmitter<string> = new EventEmitter<string>();

  currentPlayer: string;
  playerList: string[] = [];
  words: string[] = [];
  currentWord = "";
  currentWordIndex = 0;
  gameStarted: boolean = false;
  timelimit: number = 30;
  timeLeftSeconds: number = this.timelimit;
  timeInterval;
  gameUpdateSubscriptionEvent;
  numberOfGuessedWords: number = 0;
  countDownStarted: boolean = false;
  gameType: string = "alias";
  lastSession: AliasUpdate = undefined;
  showHelp = false;

  constructor(public gamesService: GamesService) {
  }

  ngOnInit(): void {
    this.gameUpdateSubscriptionEvent = this.gamesService.gameUpdateEvent.subscribe(gameState => {
      this.updateGame(gameState);
    });
    this.gamesService.sendjoinGame(this.username, this.sessionId, "alias", this.taskId);
  }

  // Remove self from players List, Send update and unsubscribe to changes
  ngOnDestroy(): void {
    let session: AliasUpdate = this.gamesService.gameSession;
    session.players = session.players.filter(playerName => playerName !== this.username);
    this.gamesService.sendUpdate(session);
    this.gameUpdateSubscriptionEvent.unsubscribe();
  }

  updateGame(gameSession: AliasUpdate) {
    if (this.gamesService != undefined) {
      this.playerList = gameSession.players;
      this.currentPlayer = gameSession.currentPlayer;
      this.numberOfGuessedWords = gameSession.numberOfGuessedWords;
      // Load new words when game started and currently words are empty
      if (this.words.length == 0 && this.gameStarted) {
        this.words = gameSession.wordsToGuess;
        this.currentWord = this.words[0];
      }

      if (this.countDownStarted == false && gameSession.countDownStarted == true) {
        this.countDownStarted = true;
        this.setTimer();
      }
    }
  }

  // Starts a game Session
  startGame(): void {
    let updateMessage: AliasUpdate = this.gamesService.gameSession;
    updateMessage.countDownStarted = true;
    this.countDownStarted = true;
    updateMessage.getWords = true;
    updateMessage.taskId = this.taskId;
    this.gamesService.sendUpdate(updateMessage);
    this.gameStarted = true;
    this.words = []
    this.setTimer();
  }

  onGameOver(): void {
    this.gameStarted = false;
    clearInterval(this.timeInterval);
    let session: AliasUpdate = this.gamesService.gameSession;
    session.aliasOver = true;
    this.gamesService.sendPlayerResult(session);
    this.currentWord = "";
    this.currentWordIndex = 0;
    this.lastSession = session;
  }

  setTimer(): void {
    this.timeLeftSeconds = this.timelimit;
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
    let session: AliasUpdate = this.gamesService.gameSession;
    this.words = this.words.filter(word =>
      word !== this.currentWord
    );

    this.currentWord = this.words[(this.currentWordIndex) % this.words.length];
    this.numberOfGuessedWords++;
    session.numberOfGuessedWords++;
    if (this.words.length === 0) {
      this.onGameOver();
    }
    this.gamesService.sendUpdate(session);
  }

  skipWord(): void {
    this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
    this.currentWord = this.words[this.currentWordIndex];
  }

  toggleHelp() {
    this.showHelp = !this.showHelp;
  }

  disconnectGame() {
    this.disconnect.emit("disconnect");
  }
}
