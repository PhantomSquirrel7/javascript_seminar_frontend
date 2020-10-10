export class JoinGameMessage {

    sessionId: string;
    playerName: string;
    gameType: string;

    constructor(sessionId, playerName, gameType){
        this.sessionId = sessionId;
        this.playerName = playerName;
        this.gameType = gameType;
    }
}