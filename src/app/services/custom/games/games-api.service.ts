import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from '../messages/message.service';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Alias } from '@app/models/game-models/alias';
import { Question } from '@app/models/game-models/question';
import { Quiz } from '@app/models/game-models/quiz';

@Injectable({
  providedIn: 'root'
})
export class GamesApiService {

  //-------- mock data -------------
  games: Array<Alias> = [
    { id: "11", name: "Class 6b", words: ["apple", "banana", "strawberry"] },
    { id: "22", name: "Class 7a", words: ["stars", "rocket", "gravity"], description: "words about space" }
  ]

  questions: Array<Question> = [
    { id: "333", type: "select", name: "Fruit Types", question: "Which fruits are red?", options: ["apple", "banana", "strawberry", "peach"], answer: [0, 2] },
    { id: "222", type: "match", name: "Englisch Vocabulary", question: "Match the appropriate translation", options: ["apple", "Apfel", "strawberry", "Erdbeere"], answer: [[0, 1], [2, 3]] }
  ]

  quizzes: Array<Quiz> = [
    { id: "000", name: "Random Quiz", description: "quiz with random questions", questions: ["333", "222"]}
  ]
  //---------------------------------

  private url = "https://javascript-group-d.herokuapp.com/"; // TODO URL to games api

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: ''   // TODO
    })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  //display message for user
  private displaylog(message: string) {
    this.messageService.add(message);
  }

  //handle errors
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // TODO do propper error handling/logging
      this.displaylog(`${operation} failed: ${error.message}`);

      //return appropriate empty result
      return of(result as T);
    }
  }

  // ------------------ ALIAS -------------------
  getAliasGames(): Observable<Alias[]> {
    //this.displaylog("Loading Alias Games");
    return of(this.games);
    return this.http.get<Alias[]>(this.url + "/games/alias/games", this.httpOptions)
      .pipe(
        catchError(this.handleError<Alias[]>('Loading Alias Games', [])
        ));
  }

  createAliasGame(game: Alias): Observable<Alias> {
    return of(game);
    return this.http.post<Alias>(this.url + "/games/alias/create", game, this.httpOptions)
      .pipe(
        catchError(this.handleError<Alias>('Saving new game failed.')
        ));
  }

  updateAliasGame(game: Alias): Observable<Alias> {
    return of(game);
    return this.http.put<Alias>(this.url + "/games/alias/" + game.id, game, this.httpOptions)
      .pipe(
        catchError(this.handleError<Alias>('Updating game failed.')
        ));
  }

  deleteAliasGame(game: Alias): Observable<any> {
    return of(game);
    return this.http.delete(this.url + "/games/alias/" + game.id, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('Deleting game failed.')
        ));
  }

  // ------------------ QUIZ -------------------
  getQuizzes(): Observable<Quiz[]> {
    //this.displaylog("Loading Quizzes");
    return of(this.quizzes);
    return this.http.get<Quiz[]>(this.url + "/games/quiz/quizzes", this.httpOptions)
      .pipe(
        catchError(this.handleError<Quiz[]>('Loading Quizzes failed', [])
        ));
  }

  getQuiz(id:string): Observable<Quiz> {
    //this.displaylog("Loading Quiz");
    return of(this.quizzes[0]);
    return this.http.get<Quiz>(this.url + "/games/quiz/quizzes/"+id, this.httpOptions)
      .pipe(
        catchError(this.handleError<Quiz>('Loading Quiz failed')
        ));
  }

  getQuestionsForQuiz(quiz: Quiz): Observable<Question[]> {
    //this.displaylog("Loading Quizzes");
    return of(this.questions);
    return this.http.get<Question[]>(this.url + "/games/quiz/quizzes/"+quiz.id+"/questions", this.httpOptions)
      .pipe(
        catchError(this.handleError<Question[]>('Loading Questions for quiz failed', [])
        ));
  }

  getQuestions(): Observable<Question[]> {
    //this.displaylog("Loading Questions");
    return of(this.questions);
    return this.http.get<Question[]>(this.url + "/games/quiz/questions", this.httpOptions)
      .pipe(
        catchError(this.handleError<Question[]>('Loading Questions failed', [])
        ));
  }

  getQuestion(id:string): Observable<Question> {
    //this.displaylog("Loading Questions");
    return of(this.questions[0]);
    return this.http.get<Question>(this.url + "/games/quiz/question/"+id, this.httpOptions)
      .pipe(
        catchError(this.handleError<Question>('Loading Question failed')
        ));
  }

  createQuiz(quiz: Quiz): Observable<Quiz> {
    return of(quiz);
    return this.http.post<Quiz>(this.url + "/games/quiz/create", quiz, this.httpOptions)
      .pipe(
        catchError(this.handleError<Quiz>('Creating new quiz failed.')
        ));
  }

  createQuestion(question: Question): Observable<Question> {
    return of(question);
    return this.http.post<Question>(this.url + "/games/quiz/question/create", question, this.httpOptions)
      .pipe(
        catchError(this.handleError<Question>('Creating new question failed.')
        ));
  }

  updateQuiz(quiz: Quiz): Observable<Quiz> {
    return of(quiz);
    return this.http.put<Quiz>(this.url + "/games/quiz/" + quiz.id, quiz, this.httpOptions)
      .pipe(
        catchError(this.handleError<Quiz>('Updating quiz failed.')
        ));
  }

  updateQuestion(question: Question): Observable<Question> {
    return of(question);
    return this.http.put<Question>(this.url + "/games/quiz/question/" + question.id, question, this.httpOptions)
      .pipe(
        catchError(this.handleError<Question>('Updating question failed.')
        ));
  }

  deleteQuiz(quiz: Quiz): Observable<any> {
    return of(quiz);
    return this.http.delete(this.url + "/games/quiz/" + quiz.id, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('Deleting quiz failed.')
        ));
  }

  deleteQuestion(question: Question): Observable<any> {
    return of(question);
    return this.http.delete(this.url + "/games/quiz/question/" + question.id, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('Deleting question failed.')
        ));
  }

  // ------------------ 2 Truth 1 Lie -------------------

  // ------------------ Draw It -------------------


}
