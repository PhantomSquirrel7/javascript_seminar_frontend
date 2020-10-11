export interface AliasUpdate {
    sessionId: string;
    players: string[];
    currentPlayer: string;
    numberOfGuessedWords: number;
    countDownStarted: boolean;
    aliasOver: boolean; 
    wordsToGuess: string[];
    wordsId: string;
}