const http = require("http");

// Map <SessionId, GameState>
var openSessions = new Map();
var io;
var alias

module.exports = {
    gameInit: function(ioServer, aliasEndpoint) {
        console.log("Creating Games socket");
        alias = aliasEndpoint;

        //create a io socket
        io = ioServer
            // io = socket(server);
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

async function handleJoinGameMessage(data, socket) {

    // Join Room that will be subscribed
    socket.join(data.sessionId);

    if (openSessions.get(data.sessionId) == undefined) {
        // Create new Session  

        console.log("Create new Session for " + data.playerName);
        let currentGame = await createSession(data.sessionId, data.gameType, data.playerName, data.taskId);
        openSessions.set(data.sessionId, currentGame);
        // TODO get Words already in this step with the task ID

        io.to(data.sessionId).emit("updateGame", currentGame);
    } else {
        // use existing Session
        console.log("Existing Session!" + openSessions.get(data.sessionId));

        // TODO what happens with wrong taskid?

        // Update Gamesession
        let currentGame = openSessions.get(data.sessionId);
        currentGame.players.push(data.playerName);
        // TODO further update Details

        // Send new State in Room to every listener
        io.to(data.sessionId).emit("updateGame", openSessions.get(data.sessionId));
    }
};

function createSession(sessionId, gameType, playerName) {
    // TODO maybe split depending on gametype
    if (gameType == "alias") {
        return createAliasSession(sessionId, gameType, playerName)
    }
}

function createAliasSession(sessionId, gameType, playerName, taskId) {
    // Create alias Session
    var session = {
        gameType: gameType,
        sessionId: sessionId,
        players: [playerName],
        currentPlayer: playerName,
        numberOfGuessedWords: 0,
        countDownStarted: false,
        aliasOver: false,
        wordsToGuess: [],
        taskId: taskId
    }
    return session;
}

// Send Update to every participant
async function handleUpdateGameMessage(data) {
    // Remove session data if nobody is connected
    if (data.players.length == 0) {
        openSessions.set(data.sessionId, undefined);
        console.log("Closing session: " + data.sessionId);
        return;
    }

    console.log("OpenSession: " + JSON.stringify(openSessions.get(data.sessionId)));
    // If game just started, query words and send them 
    if (data.countDownStarted == true && data.wordsToGuess.length == 0) {
        // TODO Sync with aliasEndpoint
        // TODO find with data.wordsId
        const query = alias.find((err, game) => {
            if (err) {
                data.wordsToGuess = ["Banana", "Apple", "Ambulance", "Trump", "Model-based design"];
            }
            // Get a random set of words for a session
            data.wordsToGuess = game[Math.floor(Math.random() * game.length)].words;
        });
        await query;
    }

    io.to(data.sessionId).emit("updateGame", data);
    openSessions.set(data.sessionId, data);
    // console.log("Update Game" + JSON.stringify(data));
};

// For Quiz give students also the correct result
// For Alias just forward the number of correct words!
function handlePlayerResultMessage(data) {
    if (data.gameType == "alias") {
        console.log("Send gameResult for Alias");
        io.to(data.sessionId).emit("gameResult", data);
        openSessions.set(data.sessionId, data);
    } else if (data.gameType == "quiz") {
        console.log("Got quiz Result. TODO");
    }
};