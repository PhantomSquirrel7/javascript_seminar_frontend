const http = require("http");
const { Session } = require("protractor");

// Map <SessionId, GameState>
var openSessions = new Map();
var io;
var aliasQuery;
var quizQuery;

module.exports = {
    gameInit: function(ioServer, aliasEndpoint, quizEndpoint) {
        console.log("Creating Games socket");
        aliasQuery = aliasEndpoint;
        quizQuery = quizEndpoint;

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

function createSession(sessionId, gameType, playerName, taskId) {
    if (gameType == "alias") {
        return createAliasSession(sessionId, gameType, playerName, taskId)
    } else if (gameType == "quiz") {
        return createQuizSession(sessionId, gameType, playerName, taskId);
    }
}

async function createQuizSession(sessionId, gameType, playerName, taskId) {
    var session = {
        gameType: gameType,
        sessionId: sessionId,
        players: [playerName],
        quizes: [],
        quizIndex: 0,
        getSolution: false,
        countDownStarted: false,
        quizOver: false,
        taskId: taskId
    }
    return session;
}

function createAliasSession(sessionId, gameType, playerName, taskId) {
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
    if (data.gameType == "alias") {
        await handleAliasUpdateMessage(data);
    } else if (data.gameType == "quiz") {
        await handleQuizUpdateMessage(data);
    } else {
        console.log("Unknown gameType: " + data.gameType);
    }
};

async function handleAliasUpdateMessage(data) {
    if (data.countDownStarted == true && data.wordsToGuess.length == 0) {
        // TODO Sync with alias endpoints

        if (data.taskId == "" || data.taskId == null || data.taskId == undefined) {
            // Get random words
            const query = aliasQuery.find((err, game) => {
                if (err) {
                    data.wordsToGuess = ["Banana", "Apple", "Ambulance", "Trump", "Model-based design"];
                } else {
                    // Get a random set of words for a session
                    data.wordsToGuess = game[Math.floor(Math.random() * game.length)].words;
                }
            });
            await query;
        } else {
            // Find by ID
            const query = aliasGame.findById(data.taskId, (err, game) => {
                if (err) {
                    data.wordsToGuess = ["Banana", "Apple", "Ambulance", "Trump", "Model-based design"];
                } else {
                    data.wordsToGuess = game.words;
                }
            });
            await query;
        }
    }
    io.to(data.sessionId).emit("updateGame", data);
    openSessions.set(data.sessionId, data);
}

async function handleQuizUpdateMessage(data) {
    if (data.countDownStarted == true && data.quizes.length == 0) {
        data.quizes = await getQuiz(data.taskId);
    }
    if (data.getSolution) {
        quizes = await getQuiz(data.taskId);
        data.quizes.correctAnswers = quizes.correctAnswers;
    }
    io.to(data.sessionId).emit("updateGame", data);
    openSessions.set(data.sessionId, data);
}

// TODO Really get something
async function getQuiz(taskId) {
    var quiz1 = {
        question: "Who was it?",
        answers: ["A", "B", "C", "All of them"],
        selectedAnswers: [],
        correctAnswers: []
    }
    var quiz2 = {
        question: "What is true?",
        answers: ["A==a", "B===B", "1+'1'", "All of them"],
        selectedAnswers: [],
        correctAnswers: []
    }
    return [quiz1, quiz2]
}

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