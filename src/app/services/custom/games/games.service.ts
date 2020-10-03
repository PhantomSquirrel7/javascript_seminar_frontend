import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class GamesService extends Socket {

  constructor() {
    super({
      url: "http://localhost:5000", options: {}
    });
  }

  sendData(data) {
    this.emit("new user", data);
    this.on("answer", (data) => {
      console.log(data);
    });
  }

}