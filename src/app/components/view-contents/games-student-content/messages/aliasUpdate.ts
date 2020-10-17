export interface AliasUpdate {
    gameType: string;
    sessionId: string; 
    players: string[];
    currentPlayer: string; // The playername of the currently in charge player
    numberOfGuessedWords: number; // number of correctly guessed words
    countDownStarted: boolean; // indicates if countdown started, a change starts countdown for all clients
    aliasOver: boolean; // Indicates that the game is over
    wordsToGuess: string[]; // Words that have to be guessed
    taskId: string; // ID of the words that will be selected from the database(Not yet implemented) TODO
}