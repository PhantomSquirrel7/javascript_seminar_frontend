import { Injectable, Optional, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from '../messages/message.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Alias } from '@app/models/game-models/alias';
import { Question } from '@app/models/game-models/question';
import { Quiz } from '@app/models/game-models/quiz';
import { DrawIt } from '@app/models/game-models/drawIt';
import { Configuration } from '@app/swagger-configs/configuration';
import { BASE_PATH } from '@app/swagger-configs/variables';

@Injectable({
  providedIn: 'root'
})
export class GamesApiService {

  //protected url = 'https://api-globy.herokuapp.com/v1';
  protected url = 'http://localhost:5000/v1';

  public configuration = new Configuration();

  constructor(private messageService: MessageService, protected http: HttpClient, @Optional() @Inject(BASE_PATH) url: string, @Optional() configuration: Configuration) {
    if (url) {
      this.url = url;
    }
    if (configuration) {
      this.configuration = configuration;
      this.url = url || configuration.basePath || this.url;
    }
    // authentication (bearerAuth) required
  }


  getHeaders(accept = "application/json") {
    let headers = new HttpHeaders();
    let accessToken = "";
    if (this.configuration.accessToken) {
      accessToken = typeof this.configuration.accessToken === 'function'
        ? this.configuration.accessToken()
        : this.configuration.accessToken;
    }
    headers = headers.set('Authorization', 'Bearer ' + accessToken).set('Accept', accept).set('Content-Type', accept);
    return headers;
  }

  //display message for user
  private displaylog(message: string, type: string) {
    this.messageService.add(message, type);
  }

  //handle errors
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // TODO do propper error handling/logging
      this.displaylog(`${operation} failed: ${error.message}`, 'error');

      return null;
    }
  }

  // ------------------ ALIAS -------------------
  getAliasGames(): Observable<Alias[]> {
    return this.http.get<Alias[]>(this.url + "/games/alias/games", { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError<Alias[]>('Loading Alias Games', [])
        ));
  }

  createAliasGame(game: Alias): Observable<Alias> {
    //return of(game);
    delete game['id'];
    return this.http.post<Alias>(this.url + "/games/alias/create", game, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError<Alias>('Saving new game')
        ));
  }

  updateAliasGame(game: Alias): Observable<Alias> {
    //return of(game);
    return this.http.put<Alias>(this.url + "/games/alias/" + game.id, game, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError<Alias>('Updating game')
        ));
  }

  deleteAliasGame(game: Alias): Observable<any> {
    //return of(game);
    return this.http.delete(this.url + "/games/alias/" + game.id, { headers: this.getHeaders("text"), responseType: 'text' })
      .pipe(
        catchError(this.handleError<any>('Deleting game')
        ));
  }

  // ------------------ QUIZ -------------------
  getQuizzes(): Observable<Quiz[]> {
    //this.displaylog("Loading Quizzes");
    //return of(this.quizzes);
    return this.http.get<Quiz[]>(this.url + "/games/quiz/quizzes", { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError<Quiz[]>('Loading Quizzes', [])
        ));
  }

  getQuiz(id: string): Observable<Quiz> {
    //this.displaylog("Loading Quiz");
    //return of(this.quizzes[0]);
    return this.http.get<Quiz>(this.url + "/games/quiz/quizzes/" + id, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError<Quiz>('Loading Quiz')
        ));
  }

  getQuestionsForQuiz(quiz: Quiz): Observable<Question[]> {
    //this.displaylog("Loading Quizzes");
    //return of(this.questions);
    return this.http.get<Question[]>(this.url + "/games/quiz/quizzes/" + quiz.id + "/questions", { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError<Question[]>('Loading Questions for quiz', [])
        ));
  }

  getQuestions(): Observable<Question[]> {
    //this.displaylog("Loading Questions");
    //return of(this.questions);
    return this.http.get<Question[]>(this.url + "/games/quiz/questions", { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError<Question[]>('Loading Questions', [])
        ));
  }

  getQuestion(id: string): Observable<Question> {
    //this.displaylog("Loading Questions");
    //return of(this.questions[0]);
    return this.http.get<Question>(this.url + "/games/quiz/question/" + id, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError<Question>('Loading Question')
        ));
  }

  createQuiz(quiz: Quiz): Observable<Quiz> {
    delete quiz['id'];
    return this.http.post<Quiz>(this.url + "/games/quiz/create", quiz, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError<Quiz>('Creating new quiz')
        ));
  }

  createQuestion(question: Question): Observable<Question> {
    delete question['id'];
    return this.http.post<Question>(this.url + "/games/quiz/question/create", question, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError<Question>('Creating new question')
        ));
  }

  updateQuiz(quiz: Quiz): Observable<Quiz> {
    //return of(quiz);
    return this.http.put<Quiz>(this.url + "/games/quiz/" + quiz.id, quiz, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError<Quiz>('Updating quiz')
        ));
  }

  updateQuestion(question: Question): Observable<Question> {
    //return of(question);
    return this.http.put<Question>(this.url + "/games/quiz/question/" + question.id, question, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError<Question>('Updating question')
        ));
  }

  deleteQuiz(quiz: Quiz): Observable<any> {
    //return of(quiz);
    return this.http.delete(this.url + "/games/quiz/" + quiz.id, { headers: this.getHeaders("text"), responseType: 'text' })
      .pipe(
        catchError(this.handleError<any>('Deleting quiz')
        ));
  }

  deleteQuestion(question: Question): Observable<any> {
    //return of(question);
    return this.http.delete(this.url + "/games/quiz/question/" + question.id, { headers: this.getHeaders("text"), responseType: 'text' })
      .pipe(
        catchError(this.handleError<any>('Deleting question')
        ));
  }

  // ------------------ Draw It -------------------
  getDrawItGames(): Observable<DrawIt[]> {
    return this.http.get<DrawIt[]>(this.url + "/games/drawit/games", { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError<DrawIt[]>('Loading DrawIt Games', [])
        ));
  }

  createDrawItGame(game: DrawIt): Observable<DrawIt> {
    delete game['id'];
    return this.http.post<DrawIt>(this.url + "/games/drawit/create", game, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError<DrawIt>('Saving new game')
        ));
  }

  updateDrawItGame(game: DrawIt): Observable<DrawIt> {
    return this.http.put<DrawIt>(this.url + "/games/drawit/" + game.id, game, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError<DrawIt>('Updating game')
        ));
  }

  deleteDrawItGame(game: DrawIt): Observable<any> {
    return this.http.delete(this.url + "/games/drawit/" + game.id, { headers: this.getHeaders("text"), responseType: 'text' })
      .pipe(
        catchError(this.handleError<any>('Deleting game')
        ));
  }
}
