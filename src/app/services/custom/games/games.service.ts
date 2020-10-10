import { Injectable , EventEmitter} from '@angular/core';
import { AliasUpdate } from '@app/components/view-contents/games-student-content/messages/aliasUpdate';
import { Socket } from 'ngx-socket-io';
import { JoinGameMessage } from '../../../components/view-contents/games-student-content/messages/joinGame';

@Injectable({
  providedIn: 'root'
})
export class GamesService extends Socket {

  connected: boolean = false;
  gameSession;
  gameUpdateEvent = new EventEmitter<any>();


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
      console.log("UpdateGame recieved" + JSON.stringify(data));
      this.handleUpdateGameMessage(data);
    });
    this.on("gameResult", (data) => {
      this.handleGameResultMessage(data);
    });

  }

  // TODO
  handleUpdateGameMessage(session){
    console.log("Recieved UpdateGame " + JSON.stringify(session));
    this.gameSession = session
    this.gameUpdateEvent.emit(session);
  }

  // TODO
  handleGameResultMessage(data){
    console.log(data);
  }


  joinGame(playerName: string, sessionId: string, gameType: string) {
    let joinMessage: JoinGameMessage = new JoinGameMessage(sessionId, playerName, gameType);
    this.emit("joinGame", joinMessage);
  }


  /*
  Send updated game Session.
  */
  sendUpdate(){
    this.emit("updateGame", this.gameSession);
  }


  // TODO
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