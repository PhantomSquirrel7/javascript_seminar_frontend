import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';


@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor() {
    this.startWebsocket();
  }

  private ws;
  private wsURL = "ws://localhost:8081";

  startWebsocket() {
    this.ws = webSocket(this.wsURL);
    this.ws.subscribe(
      data => console.log('got data ' + data),
      error => console.error('something wrong occurred: ' + error),
      () => console.log('complete')
    );
    console.log("Starting socket");
  }

  sendData(data) {
    this.ws.next(data);
    console.log(data);
  }








}