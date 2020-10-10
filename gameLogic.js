const socket = require("socket.io");

// Map <SessionId, GameState>
var openSessions = new Map();
var io;

module.exports = {
    gameInit: function(http) {
        //create a io socket
        io = socket(http);
        const connectedUsers = new Set(); //a list of every connection to the socket
        io.on("connection", function(socket) {
            console.log("Made socket connection");

            // Defines Signals to react to
            socket.on("connect", (data) => {
                console.log("Client Connected: " + data);
            });

            socket.on("disconnect", () => {
                console.log("Disconnecting");
                connectedUsers.delete(socket.userId);
            });

            socket.on("joinGame", (data) => {
                handleJoinGameMessage(data, socket);
            });

            socket.on("updateGame", (data) => {
                handleUpdateGameMessage(data);
            });

            socket.on("playerResult", (data) => {
                handlePlayerResultMessage(data);
            });
        });

    }
}

function handleJoinGameMessage(data, socket) {
    // console.log("Recieved Join Message: " + JSON.stringify(data));

    // Join Room that will be subscribed
    socket.join(data.sessionId);

    if (openSessions.get(data.sessionId) == undefined) {
        // Create new Session  
        let currentGame = createSession(data.sessionId, data.gameType, data.playerName);
        openSessions.set(data.sessionId, currentGame);
        console.log(currentGame)
        io.to(data.sessionId).emit("updateGame", currentGame);
        socket.on("updateGame", handleUpdateGameMessage);

    } else {
        // use existing Session
        console.log("Existing Session!" + openSessions.get(data.sessionId));

        // Update Gamesession
        let currentGame = openSessions.get(data.sessionId);
        currentGame.players.push(data.playerName);
        // TODO further update Details

        // Send new State in Room to every listener
        io.to(data.sessionId).emit("updateGame", openSessions.get(data.sessionId));
    }
};

/*
currentSession {
    ...
    sessionId : string,
    players : [],
    ...
  }
}
*/

function createSession(sessionId, gameType, playerName) {
    // TODO maybe split depending on gametype
    var session = {
        gameType: gameType,
        sessionId: sessionId,
        players: [playerName],
        currentPlayer: playerName,
        numberOfGuessedWords: 0,
        countDownStarted: false,
    }
    return session;
}


function handleUpdateGameMessage(data) {
    io.to(data.sessionId).emit("updateGame", data);
    openSessions.set(data.sessionId, data);
    console.log("Update Game" + JSON.stringify(data));
};

function handlePlayerResultMessage(data, socket) {
    console.log(JSON.stringify(data));
};