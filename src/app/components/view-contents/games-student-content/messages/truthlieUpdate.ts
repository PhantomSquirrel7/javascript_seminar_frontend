export interface TruthlieUpdate {
    gameType: 'truthlie';
    sessionId: string;
    players: string[];
    played: string[];
    currentPlayer: string; // The playername of the currently in charge player
    countDownStarted: boolean; // indicates if countdown started, a change starts countdown for all clients
    options: string[];
    guessed: string[];
    lie: string; // False statement
    truths: Array<string>; // true statements
    name: string;   // name of the game
    state: 'lobby' | 'result' | 'running' | 'over';
    timelimit: number;
    timeleft: number;
    next: Boolean;
}
