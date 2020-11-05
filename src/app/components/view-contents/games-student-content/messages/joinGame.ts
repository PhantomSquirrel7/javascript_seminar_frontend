export class JoinGameMessage {

    sessionId: string;
    playerName: string;
    gameType: string;
    taskId: string;

    constructor(sessionId, playerName, gameType, taskId){
        this.sessionId = sessionId;
        this.playerName = playerName;
        this.gameType = gameType;
        this.taskId = taskId;
    }
}