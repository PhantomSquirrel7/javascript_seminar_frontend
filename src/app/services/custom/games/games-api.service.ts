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

  games: Array<Alias> = [
    { id: "11", name: "Class 6b", words: ["apple", "banana", "strawberry"] },
    { id: "22", name: "Class 7a", words: ["stars", "rocket", "gravity"], description: "words about space" }
  ]

  questions: Array<Question> = [
    { id: "333", type: "select", name: "Fruit Types", question: "Which fruits are red?", options: ["apple", "banana", "strawberry", "peach"], answers: [0, 2] },
    { id: "222", type: "match", name: "Englisch Vocabulary", question: "Match the approporate translation", options: ["apple", "Apfel", "strawberry", "Erdbeere"], answers: [[0, 1], [2, 3]] }
  ]

  quizzes: Array<Quiz> = [
    { id: "000", name: "Random Quiz", description: "quiz with random questions", questions: ["333", "222"]}
  ]

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
        catchError(this.handleError<Quiz[]>('Loading Quizzes', [])
        ));
  }

  getQuiz(id:string): Observable<Quiz> {
    //this.displaylog("Loading Quiz");
    return of(this.quizzes[0]);
    return this.http.get<Quiz>(this.url + "/games/quiz/quizzes/"+id, this.httpOptions)
      .pipe(
        catchError(this.handleError<Quiz>('Loading Quiz')
        ));
  }

  getQuestionsForQuiz(quiz: Quiz): Observable<Question[]> {
    //this.displaylog("Loading Quizzes");
    return of(this.questions);
    return this.http.get<Question[]>(this.url + "/games/quiz/quizzes/"+quiz.id+"/questions", this.httpOptions)
      .pipe(
        catchError(this.handleError<Question[]>('Loading Questions for quiz', [])
        ));
  }

  getQuestions(): Observable<Question[]> {
    //this.displaylog("Loading Questions");
    return of(this.questions);
    return this.http.get<Question[]>(this.url + "/games/quiz/questions", this.httpOptions)
      .pipe(
        catchError(this.handleError<Question[]>('Loading Questions', [])
        ));
  }


  // ------------------ 2 Truth 1 Lie -------------------

  // ------------------ Draw It -------------------


}
