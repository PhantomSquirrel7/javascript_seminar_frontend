import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { GamesService } from '@app/services/custom/games/games.service';
import { QuizUpdate } from '../messages/quizUpdate';
import { Quiz } from "../model/quiz";

import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class GamesQuizComponent implements OnInit, OnDestroy {

  // finished to notify parent component
  @Output() finished = new EventEmitter<boolean>();
  @Input() username: string;
  @Input() sessionId: string;
  @Input() taskId: string;

  gameUpdateSubscriptionEvent;
  quizUpdate: QuizUpdate;
  currentQuiz: Quiz;
  timeLimit: number = 30;
  timeLeftSeconds: number = this.timeLimit;
  timeInterval;
  leftAnswers : string[] = ["a", "b"];
  rightAnswers : string[] = ["c", "dwoakadwo"];

  constructor(public gamesService: GamesService) {
    this.quizUpdate = {
      gameType: "quiz",
      sessionId: this.sessionId,
      players: [this.username],
      quizes: [],
      getSolution: false,
      quizIndex: 0,
      countDownStarted: false,
      quizOver: false,
      taskId: this.taskId
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    console.log(this.leftAnswers);
  }

  ngOnInit(): void {
    this.gamesService.sendjoinGame(this.username, this.sessionId, "quiz", this.taskId);
    this.gameUpdateSubscriptionEvent = this.gamesService.gameUpdateEvent.subscribe(gameState => {
      this.handleRecievedUpdateGame(gameState);
    });
  }

  // Remove self from players and unsubscribe to changes
  ngOnDestroy(): void {
    this.quizUpdate.players = this.quizUpdate.players.filter(playerName => playerName !== this.username);
    this.gamesService.sendUpdate(this.quizUpdate);
    this.gameUpdateSubscriptionEvent.unsubscribe();
  }

  // Submit answers to Backend and display results
  onSubmitAnswers(): void {
    this.quizUpdate.getSolution = true;
    this.quizUpdate.quizOver = true;
    this.gamesService.sendUpdate(this.quizUpdate);
    this.finished.emit(true);
  }

  onGameOver(): void {
    this.quizUpdate.quizOver = true;
    this.sendUpdateGame();
    clearInterval(this.timeInterval);
    console.log("TODO Gameover");
  }

  /*
  Switch to next question and let other peers know
  */
  onNextQuestion(): void {
    this.quizUpdate.quizIndex = (this.quizUpdate.quizIndex + 1) % this.quizUpdate.quizes.length;
    this.currentQuiz = this.quizUpdate.quizes[this.quizUpdate.quizIndex];
    this.sendUpdateGame();
  }
  /*
  Switch to previous Question and let other peers know
  */
  onPreviousQuestion(): void {
    if (this.quizUpdate.quizIndex == 0) {
      this.quizUpdate.quizIndex = this.quizUpdate.quizes.length - 1;
    } else {
      this.quizUpdate.quizIndex--;
    }
    this.currentQuiz = this.quizUpdate.quizes[this.quizUpdate.quizIndex];
    this.sendUpdateGame();
  }

  // Updates the current Session with the selected answers
  onSelectionChange(event): void {
    this.quizUpdate.quizes[this.quizUpdate.quizIndex].selectedAnswers = event;
    this.sendUpdateGame();
  }

  // Start timer and notify others
  onStartQuiz(): void {
    this.setTimer();
    this.quizUpdate.countDownStarted = true;
    this.gamesService.sendUpdate(this.quizUpdate);
  }

  setTimer(): void {
    this.timeLeftSeconds = this.timeLimit;
    this.timeInterval = setInterval(() => {
      this.timeLeftSeconds -= 1;
      if (this.timeLeftSeconds <= 0) {
        this.onGameOver();
      }
    }, 1000);
  }





  // Updates the current view with a recieved update
  handleRecievedUpdateGame(quizUpdate: QuizUpdate) {
    if (quizUpdate.quizes.length > 0) {
      this.currentQuiz = quizUpdate.quizes[quizUpdate.quizIndex];
    }
    if (this.quizUpdate.countDownStarted == false && quizUpdate.countDownStarted) {
      // Start Countdown Now!
      this.setTimer();
    }
    this.quizUpdate = quizUpdate;
  }

  sendUpdateGame(): void {
    this.gamesService.sendUpdate(this.quizUpdate);
  }

  getBackgroundColor(answer) {
    if (this.quizUpdate.quizOver == true && this.quizUpdate.quizes.length != 0) {
      // Correct solution selected
      if ((
        this.quizUpdate.quizes[this.quizUpdate.quizIndex].selectedAnswers.includes(answer)
        && this.quizUpdate.quizes[this.quizUpdate.quizIndex].correctAnswers.includes(answer)
      ) ||
      // Wrong solution not selected
        (
          !this.quizUpdate.quizes[this.quizUpdate.quizIndex].selectedAnswers.includes(answer)
          && !this.quizUpdate.quizes[this.quizUpdate.quizIndex].correctAnswers.includes(answer)
        )) {
        return "green";
      }
      else {
        return "red";
      }
    } else {
      return "white";
    }
  }
}
