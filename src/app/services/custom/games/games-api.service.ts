import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Alias } from '@app/models/game-models/alias';
import { MessageService } from '../messages/message.service';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GamesApiService {

  games: Array<Alias> = [
    { id: 123, name: "Class 6b", words: ["space", "force", "chemistry"] },
    { id: 2134, name: "Class 7a", words: ["stars", "rocket", "gravity"], description: "words about space" }
  ]

  private url= "https://javascript-group-d.herokuapp.com/"; // TODO URL to games api

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'my-auth-token'
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
    return this.http.get<Alias[]>(this.url+"/games/alias/games", this.httpOptions)
      .pipe(
        catchError(this.handleError<Alias[]>('Loading Alias Games', [])
        ));
  }

  createAliasGame(game:Alias): Observable<Alias> {
    return of(game);
    return this.http.post<Alias>(this.url+"/games/alias/create", game, this.httpOptions)
      .pipe(
        catchError(this.handleError<Alias>('Saving new game failed.')
        ));
  }

  updateAliasGame(game:Alias): Observable<Alias> {
    return of(game);
    return this.http.put<Alias>(this.url+"/games/alias/"+game.id, game, this.httpOptions)
      .pipe(
        catchError(this.handleError<Alias>('Updating game failed.')
        ));
  }

  deleteAliasGame(game:Alias): Observable<any> {
    return of(game);
    return this.http.delete(this.url+"/games/alias/"+game.id, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('Deleting game failed.')
        ));
  }

  // ------------------ QUIZ -------------------

  // ------------------ 2 Truth 1 Lie -------------------

  // ------------------ Draw It -------------------


}
