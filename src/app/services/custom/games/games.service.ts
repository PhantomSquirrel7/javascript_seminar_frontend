import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { JoinGameMessage } from '../../../components/view-contents/games-student-content/messages/joinGame';

@Injectable({
  providedIn: 'root'
})
export class GamesService extends Socket {

  connected: boolean = false;

  constructor() {
    super({
      url: "http://localhost:5000", options: {}
    });
    console.log("Try connecting");

    // Connection Messages
    this.on("connect_error", () => {
      console.log("connection error");
      this.connected = false;
    });
    this.on("reconnect_error", () => {
      console.log("Reconnection Error");
      this.connected = false;
    });
    this.on("connect", () => {
      console.log("connected");
      this.connected = true;
    });

    // Gameplay Messages
    this.on("updateGame", (data) => {
      console.log("UpdateGame recieved" + data);
      this.handleUpdateGameMessage(data);
    });
    this.on("gameResult", (data) => {
      this.handleGameResultMessage(data);
    });

  }

  handleUpdateGameMessage(data){
    console.log(data);
  }

  handleGameResultMessage(data){
    console.log(data);
  }


  joinGame(playerName: string, sessionId: string, gameType: string) {
    let joinMessage: JoinGameMessage = new JoinGameMessage(sessionId, playerName, gameType);
    this.emit("joinGame", joinMessage);
    this.on(sessionId, (data) => {
      console.log(data);
      console.log("Got Answer from Session"  ,data.sessionId);
    })
  }

  sendUpdate(updateGameMessage){
    this.emit("updateGame", updateGameMessage);
  }

  sendPlayerResult(playerResultMessage){
    this.emit("playerResult", playerResultMessage);
  }

  // Debug
  sendData(data) {
    console.log("Send data" + data)
    this.emit("new user", data);
    this.on("answer", (data) => {
      console.log(data);
    });
  }

}