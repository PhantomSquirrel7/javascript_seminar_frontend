import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from '../messages/message.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Alias } from '@app/models/game-models/alias';
import { Question } from '@app/models/game-models/question';
import { Quiz } from '@app/models/game-models/quiz';
import { DrawIt } from '@app/models/game-models/drawIt';

@Injectable({
  providedIn: 'root'
})
export class GamesApiService {

  private url = "https://javascript-group-d-frontend.herokuapp.com";

  private httpOptionsJson = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: ''   // TODO
    })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

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
    return this.http.get<Alias[]>(this.url + "/games/alias/games", this.httpOptionsJson)
      .pipe(
        catchError(this.handleError<Alias[]>('Loading Alias Games', [])
        ));
  }

  createAliasGame(game: Alias): Observable<Alias> {
    //return of(game);
    delete game['_id'];
    return this.http.post<Alias>(this.url + "/games/alias/create", game, this.httpOptionsJson)
      .pipe(
        catchError(this.handleError<Alias>('Saving new game')
        ));
  }

  updateAliasGame(game: Alias): Observable<Alias> {
    //return of(game);
    return this.http.put<Alias>(this.url + "/games/alias/" + game._id, game, this.httpOptionsJson)
      .pipe(
        catchError(this.handleError<Alias>('Updating game')
        ));
  }

  deleteAliasGame(game: Alias): Observable<any> {
    //return of(game);
    return this.http.delete(this.url + "/games/alias/" + game._id, { responseType: 'text' })
      .pipe(
        catchError(this.handleError<any>('Deleting game')
        ));
  }

  // ------------------ QUIZ -------------------
  getQuizzes(): Observable<Quiz[]> {
    //this.displaylog("Loading Quizzes");
    //return of(this.quizzes);
    return this.http.get<Quiz[]>(this.url + "/games/quiz/quizzes", this.httpOptionsJson)
      .pipe(
        catchError(this.handleError<Quiz[]>('Loading Quizzes', [])
        ));
  }

  getQuiz(id: string): Observable<Quiz> {
    //this.displaylog("Loading Quiz");
    //return of(this.quizzes[0]);
    return this.http.get<Quiz>(this.url + "/games/quiz/quizzes/" + id, this.httpOptionsJson)
      .pipe(
        catchError(this.handleError<Quiz>('Loading Quiz')
        ));
  }

  getQuestionsForQuiz(quiz: Quiz): Observable<Question[]> {
    //this.displaylog("Loading Quizzes");
    //return of(this.questions);
    return this.http.get<Question[]>(this.url + "/games/quiz/quizzes/" + quiz._id + "/questions", this.httpOptionsJson)
      .pipe(
        catchError(this.handleError<Question[]>('Loading Questions for quiz', [])
        ));
  }

  getQuestions(): Observable<Question[]> {
    //this.displaylog("Loading Questions");
    //return of(this.questions);
    return this.http.get<Question[]>(this.url + "/games/quiz/questions", this.httpOptionsJson)
      .pipe(
        catchError(this.handleError<Question[]>('Loading Questions', [])
        ));
  }

  getQuestion(id: string): Observable<Question> {
    //this.displaylog("Loading Questions");
    //return of(this.questions[0]);
    return this.http.get<Question>(this.url + "/games/quiz/question/" + id, this.httpOptionsJson)
      .pipe(
        catchError(this.handleError<Question>('Loading Question')
        ));
  }

  createQuiz(quiz: Quiz): Observable<Quiz> {
    delete quiz['_id'];
    return this.http.post<Quiz>(this.url + "/games/quiz/create", quiz, this.httpOptionsJson)
      .pipe(
        catchError(this.handleError<Quiz>('Creating new quiz')
        ));
  }

  createQuestion(question: Question): Observable<Question> {
    delete question['_id'];
    return this.http.post<Question>(this.url + "/games/quiz/question/create", question, this.httpOptionsJson)
      .pipe(
        catchError(this.handleError<Question>('Creating new question')
        ));
  }

  updateQuiz(quiz: Quiz): Observable<Quiz> {
    //return of(quiz);
    return this.http.put<Quiz>(this.url + "/games/quiz/" + quiz._id, quiz, this.httpOptionsJson)
      .pipe(
        catchError(this.handleError<Quiz>('Updating quiz')
        ));
  }

  updateQuestion(question: Question): Observable<Question> {
    //return of(question);
    return this.http.put<Question>(this.url + "/games/quiz/question/" + question._id, question, this.httpOptionsJson)
      .pipe(
        catchError(this.handleError<Question>('Updating question')
        ));
  }

  deleteQuiz(quiz: Quiz): Observable<any> {
    //return of(quiz);
    return this.http.delete(this.url + "/games/quiz/" + quiz._id, { responseType: 'text' })
      .pipe(
        catchError(this.handleError<any>('Deleting quiz')
        ));
  }

  deleteQuestion(question: Question): Observable<any> {
    //return of(question);
    return this.http.delete(this.url + "/games/quiz/question/" + question._id, { responseType: 'text' })
      .pipe(
        catchError(this.handleError<any>('Deleting question')
        ));
  }

  // ------------------ Draw It -------------------
  getDrawItGames(): Observable<DrawIt[]> {
    return this.http.get<DrawIt[]>(this.url + "/games/drawit/games", this.httpOptionsJson)
      .pipe(
        catchError(this.handleError<DrawIt[]>('Loading DrawIt Games', [])
        ));
  }

  createDrawItGame(game: DrawIt): Observable<DrawIt> {
    delete game['_id'];
    return this.http.post<DrawIt>(this.url + "/games/drawit/create", game, this.httpOptionsJson)
      .pipe(
        catchError(this.handleError<DrawIt>('Saving new game')
        ));
  }

  updateDrawItGame(game: DrawIt): Observable<DrawIt> {
    return this.http.put<DrawIt>(this.url + "/games/drawit/" + game._id, game, this.httpOptionsJson)
      .pipe(
        catchError(this.handleError<DrawIt>('Updating game')
        ));
  }

  deleteDrawItGame(game: DrawIt): Observable<any> {
    return this.http.delete(this.url + "/games/drawit/" + game._id, { responseType: 'text' })
      .pipe(
        catchError(this.handleError<any>('Deleting game')
        ));
  }
}
