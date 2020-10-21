export interface DrawItUpdate {
    gameType: "drawit";
    sessionId: string;
    players: string[];
    currentPlayer: string; // The playername of the currently in charge player
    numberOfGuessedWords: number; // number of correctly guessed words
    countDownStarted: boolean; // indicates if countdown started, a change starts countdown for all clients
    words: string[]; // Words that have to be guessed
    name: string;   // name of the game
    description: string;    // description of the game
    taskId: string; // ID of the words that will be selected from the database(Not yet implemented) TODO
    state: "lobby" | "running" | "over";
    timelimit: number;
    timeleft: number;
}