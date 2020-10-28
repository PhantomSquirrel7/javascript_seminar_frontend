import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { GamesService } from '@app/services/custom/games/games.service';
import { QuizUpdate } from '../messages/quizUpdate';
import { Quiz } from "../model/quiz";

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { getTreeNoValidDataSourceError } from '@angular/cdk/tree';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class GamesQuizComponent implements OnInit, OnDestroy {

  // finished to notify parent component
  @Output() disconnect = new EventEmitter<string>();
  @Input() username: string;
  @Input() sessionId: string;
  @Input() taskId: string;

  gameUpdateSubscriptionEvent;
  quizUpdate: QuizUpdate;
  currentQuiz: Quiz;
  timeLimit: number = 30;
  timeLeftSeconds: number = this.timeLimit;
  timeInterval;    
  showHelp : boolean = false;

  constructor(public gamesService: GamesService) {
    this.quizUpdate = {
      gameType: "quiz",
      sessionId: this.sessionId,
      players: [this.username],
      quizes: [],
      state: "lobby",
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
    this.quizUpdate.state = "running";
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
    console.log(quizUpdate)
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

  getBackgroundColorSelection(answer) {
    if (this.quizUpdate.quizOver == true && this.quizUpdate.quizes.length != 0) {

      let i = this.quizUpdate.quizes[this.quizUpdate.quizIndex].answers.indexOf(answer);
      // Correct solution selected
      if ((
        this.quizUpdate.quizes[this.quizUpdate.quizIndex].selectedAnswers.includes(answer)
        && this.quizUpdate.quizes[this.quizUpdate.quizIndex].correctAnswers.includes(i)
      ) ||
        // Wrong solution not selected
        (
          !this.quizUpdate.quizes[this.quizUpdate.quizIndex].selectedAnswers.includes(answer)
          && !this.quizUpdate.quizes[this.quizUpdate.quizIndex].correctAnswers.includes(i)
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

  /*
  Color the cards once the game is finished to provide feedback.
  */
  getBackgroundColorMatching(answer, position) {
    // White while in Progress
    if (!this.quizUpdate.quizOver) {
      return "white";
    }
    let correctAnswers = this.quizUpdate.quizes[this.quizUpdate.quizIndex].correctAnswers;
    let indexAnswers = this.quizUpdate.quizes[this.quizUpdate.quizIndex].answers.indexOf(answer);
    let selectedAnswerMatch = [];
    if (position == "left") {
      let indexLeft = this.currentQuiz.leftAnswers.indexOf(answer);
      let indexAnswersMatch = this.quizUpdate.quizes[this.quizUpdate.quizIndex].answers.indexOf(this.currentQuiz.rightAnswers[indexLeft]);
      selectedAnswerMatch = [indexAnswers, indexAnswersMatch];
      // Check if [indexAnswers, indexAnswersMatch] is in Array
    } else if (position == "right") {
      let indexRight = this.currentQuiz.rightAnswers.indexOf(answer);
      let indexAnswersMatch = this.quizUpdate.quizes[this.quizUpdate.quizIndex].answers.indexOf(this.currentQuiz.leftAnswers[indexRight]);
      selectedAnswerMatch = [indexAnswersMatch, indexAnswers];
    }
    for (var i = 0; i < correctAnswers.length; i++) {
      if ((correctAnswers[i][0] == selectedAnswerMatch[0] && correctAnswers[i][1] == selectedAnswerMatch[1])
        || (correctAnswers[i][0] == selectedAnswerMatch[1] && correctAnswers[i][1] == selectedAnswerMatch[0]
        )
      ) {
        return "green";
      }
    }
    return "red";
  }


  toggleHelp() {
    this.showHelp = !this.showHelp;
    console.log(this.quizUpdate.state);
  }

  disconnectGame() {
    this.disconnect.emit("disconnect");
  }
}