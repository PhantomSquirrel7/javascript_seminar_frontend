import { Injectable, EventEmitter } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { JoinGameMessage } from '../../../components/view-contents/games-student-content/messages/joinGame';


@Injectable({
  providedIn: 'root'
})
export class GamesService extends Socket {

  connected: boolean = false;
  gameUpdateEvent = new EventEmitter<any>();
  drawingUpdateEvent = new EventEmitter<any>();


  // TODO Move gamesession to component
  gameSession;

  // TODO make this adjustable
  constructor() {
    super({
      url: "https://api-globy.herokuapp.com", options: {}
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
      this.handleUpdateGameMessage(data);
    });
    this.on("drawingUpdate", (data) => {
      this.handleDrawingUpdate(data);
    });
  }

  // Recieve and save and updated gameSession and let listeners update
  handleUpdateGameMessage(session) {
    this.gameSession = session;
    this.gameUpdateEvent.emit(session);
  }

  handleDrawingUpdate(drawing) {
    this.drawingUpdateEvent.emit(drawing);
  }

  // Send a joinGame Message
  sendjoinGame(playerName: string, sessionId: string, gameType: string, taskId: string) {
    console.log("join game")
    let joinMessage: JoinGameMessage = new JoinGameMessage(sessionId, playerName, gameType, taskId);
    this.emit("joinGame", joinMessage);
  }


  /*
  Send updated game Session.
  */
  sendUpdate(updateGame) {
    // console.log("Send Update" + JSON.stringify(updateGame));
    this.emit("updateGame", updateGame);
  }

  sendDisconnect() {
    this.emit("customDisconnect");
  }

}