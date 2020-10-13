import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { GamesService } from '@app/services/custom/games/games.service';
import { QuizUpdate } from '../messages/quizUpdate';
import { Quiz } from "../model/quiz";
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class GamesQuizComponent implements OnInit, OnDestroy {

  // finished to notify parent component
  @Output() finished = new EventEmitter<boolean>();
  @Input() username : string;
  @Input() sessionId : string;
  @Input() taskId : string;

  gameUpdateSubscriptionEvent;
  playerList: string[] = [];
  quizUpdate : QuizUpdate = undefined;
  currentQuiz : Quiz;

  // Mock quiz
  quiz: Quiz = {
    question: "What is your favourite letter?",
    answers: ["Answer A","Answer B","None of the above","All of the above"],
    selectedAnswers: [],
    correctAnswers: []
  }
  quiz2: Quiz = {
    question: "What do you call a pile of cats?",
    answers: ["A room fool of cats", "Cats are just weird dogs","A mountain of cats","A bunch of cats","A meow-ntain!"],
    selectedAnswers: [],
    correctAnswers: []
  }
  quiz3: Quiz = {
    question: "Never gonna give you up",
    answers: ["Never gonna let you down", "Never gonna run around ","and desert you"],
    selectedAnswers: [],
    correctAnswers: []
  }

  // currentQuiz: Quiz = this.quiz;

  // quizSet : Quiz[] = [this.quiz, this.quiz2, this.quiz3];
  // quizIndex : number = 0;
  constructor(private gamesService : GamesService) {
    this.quizUpdate = {
      sessionId: this.sessionId,
      players: [this.username],
      quizes: [this.quiz, this.quiz2, this.quiz3],
      getSolution: false,
      quizIndex: 0,
      countDownStarted: false,
      quizOver: false,
      taskId: this.taskId
  };
  this.currentQuiz = this.quizUpdate.quizes[this.quizUpdate.quizIndex];

  }

  ngOnInit(): void {
    console.log("Send join Game");
    console.log(this.username);
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
    this.gamesService.sendUpdate(this.quizUpdate);
    console.log("Sending quizzes" + JSON.stringify(this.quizUpdate));
    this.finished.emit(true);
  }

  /*
  Switch to next question and let other peers know
  */
  onNextQuestion(): void{
    this.quizUpdate.quizIndex = (this.quizUpdate.quizIndex+1) % this.quizUpdate.quizes.length;
    this.currentQuiz = this.quizUpdate.quizes[this.quizUpdate.quizIndex];
    this.sendUpdateGame();
  }
  /*
  Switch to previous Question and let other peers know
  */
  onPreviousQuestion(): void {
    if (this.quizUpdate.quizIndex == 0){
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

  // Updates the current view with a recieved update
  handleRecievedUpdateGame(quizUpdate: QuizUpdate) {
    // TODO
    // this.quizUpdate = quizUpdate;
    console.log("TODO Gameupdate")
  }

  sendUpdateGame(): void {
    this.gamesService.sendUpdate(this.quizUpdate);
  }

}
