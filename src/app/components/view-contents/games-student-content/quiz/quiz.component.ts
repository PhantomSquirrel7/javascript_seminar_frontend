import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';

import { GamesService } from '@app/services/custom/games/games.service';
import { QuizUpdate } from '../messages/quizUpdate';
import { Quiz } from "../model/quiz";

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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
  timeLeftSeconds: number = 180;
  timeInterval;
  showHelp: boolean = false;
  updateTimeNextUpdate: boolean = false;

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
      taskId: this.taskId,
      timeleft: 180,
      timelimit: 180,
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
    this.sendUpdateGame();
  }

  ngOnInit(): void {
    this.gamesService.sendjoinGame(this.username, this.sessionId, "quiz", this.taskId);
    this.gameUpdateSubscriptionEvent = this.gamesService.gameUpdateEvent.subscribe(gameState => {
      this.handleRecievedUpdateGame(gameState);
    });
  }

  //Unsubscribe to changes
  ngOnDestroy(): void {
    this.gameUpdateSubscriptionEvent.unsubscribe();
  }

  // Submit answers to Backend and display results
  onSubmitAnswers(): void {
    this.quizUpdate.getSolution = true;
    this.quizUpdate.quizOver = true;
    this.sendUpdateGame();
  }

  onGameOver(): void {
    this.quizUpdate.quizOver = true;
    this.sendUpdateGame();
    clearInterval(this.timeInterval);
    //console.log("TODO Gameover");
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
    this.sendUpdateGame();
  }

  setTimer(): void {
    this.timeInterval = setInterval(() => {
      this.timeLeftSeconds -= 1;
      if (this.timeLeftSeconds <= 0) {
        this.onGameOver();
      }
    }, 1000);
  }

  // Updates the current view with a recieved update
  handleRecievedUpdateGame(quizUpdate: QuizUpdate) {
    if (!quizUpdate.players.includes(this.username)) {
      // Player disconnected from other device
      this.disconnectGame()
      return;
    }
    if (quizUpdate.quizes.length > 0) {
      this.currentQuiz = quizUpdate.quizes[quizUpdate.quizIndex];
    }
    if (this.updateTimeNextUpdate) {
      this.updateTimeNextUpdate = false;
      this.timeLeftSeconds = quizUpdate.timeleft;
    }
    if (this.quizUpdate.countDownStarted == false && quizUpdate.countDownStarted) {
      // Start with given timeleft
      this.timeLeftSeconds = quizUpdate.timeleft;
      this.setTimer();
      this.updateTimeNextUpdate = true;
    }
    if (quizUpdate.getSolution) {
      clearInterval(this.timeInterval);
    }
    this.quizUpdate = quizUpdate;
  }

  sendUpdateGame(): void {
    this.quizUpdate.timeleft = this.timeLeftSeconds;
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
        return "#b5f1b5";
      }
      else {
        return "#eeaca4";
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
        return "#b5f1b5";
      }
    }
    return "#eeaca4";
  }


  toggleHelp() {
    this.showHelp = !this.showHelp;
    //console.log(this.quizUpdate.state);
  }

  disconnectGame() {
    this.gamesService.sendDisconnect();
    this.disconnect.emit("disconnect");
  }
}