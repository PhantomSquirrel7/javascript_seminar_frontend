const fetch = require('node-fetch');


// Map <SessionId, GameState>
var openSessions = new Map();
var io;


var url = "https://javascript-group-d-frontend.herokuapp.com";
// var url = "http://localhost:8080";


module.exports = {
    gameInit: function (ioServer) {
        console.log("Creating Games socket");
        //create a io socket
        io = ioServer
        // io = socket(server);
        const connectedUsers = new Set(); //a list of every connection to the socket
        io.on("connection", function (socket) {
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
    } else if (gameType == "drawit") {
        return createDrawItSession(sessionId, gameType, playerName, taskId);
    } else if (gameType == "quiz") {
        return createQuizSession(sessionId, gameType, playerName, taskId);
    } else if (gameType == "truthlie") {
        return createTruthlieSession (sessionId,gameType, playerName, taskId);
    }

}

async function createQuizSession(sessionId, gameType, playerName, taskId) {
    var session = {
        gameType: gameType,
        sessionId: sessionId,
        players: [playerName],
        quizes: [],
        state: "lobby",
        quizIndex: 0,
        getSolution: false,
        countDownStarted: false,
        quizOver: false,
        taskId: taskId
    }
    return session;
}

async function createAliasSession(sessionId, gameType, playerName, taskId) {
    var session = {
        gameType: gameType,
        sessionId: sessionId,
        players: [playerName],
        currentPlayer: playerName,
        numberOfGuessedWords: 0,
        countDownStarted: false,
        words: [],
        name: "",
        description: "",
        taskId: taskId,
        state: "lobby",
        timelimit: 30,
        timeleft: 30
    }
    try {
        let alias = await getAliasGame(taskId);
        session.words = alias.words;
        session.name = alias.name;
        session.description = alias.description;
        return session;

    } catch (error) {
        console.log("could not get alias game")
        return null;
    }
}

async function createTruthlieSession(sessionId, gameType, playerName, taskId){
    var session = {
        gameType: gameType,
        sessionId: sessionId,
        players: [playerName],
        played: [],
        currentPlayer: playerName, // The playername of the currently in charge player
        countDownStarted: false, // indicates if countdown started, a change starts countdown for all clients
        options: [],
        guessed: [],
        lie: "",// False statemenr
        name: "",  // name of the game
        state: 'lobby',
        timelimit: 30,
        timeleft: 30
    }
    return session;
}

async function createDrawItSession(sessionId, gameType, playerName, taskId) {
    var session = {
        gameType: gameType,
        sessionId: sessionId,
        players: [playerName],
        currentPlayer: playerName,
        numberOfGuessedWords: 0,
        countDownStarted: false,
        words: [],
        name: "",
        description: "",
        taskId: taskId,
        state: "lobby",
        timelimit: 30,
        timeleft: 30,
        drawing: null
    }
    try {
        let drawit = await getDrawItGame(taskId);
        session.words = alias.words;
        session.name = alias.name;
        session.description = drawit.description;
        return session;

    } catch (error) {
        console.log("could not get drawit game")
        return null;
    }
}

async function getAliasGame(taskId) {
    var hex = /[0-9A-Fa-f]{6}/g;
    if (taskId == "" || taskId == null || taskId == undefined || !hex.test(taskId)) {
        // Get random words
        console.log("Wrong taskID, get random words"); // TODO -> throw and handle error! 
        return {
            id: taskId,
            name: "Mock Alias Game",
            description: "this is not a real game",
            words: ["Banana", "Trump", "Bicycle", "Pluto"]
        }

    } else {
        // Find by ID
        try {
            let alias = fetch(url + '/games/alias/' + taskId).then(res => res.json())
            console.log("FETCHED ALIAS", alias);
            return alias;
        } catch (error) {
            console.log(error)
            return null;
        }
    }
}

async function getDrawItGame(taskId) {
    var hex = /[0-9A-Fa-f]{6}/g;
    if (taskId == "" || taskId == null || taskId == undefined || !hex.test(taskId)) {
        // Get random words
        console.log("Wrong taskID, get random words"); // TODO -> throw and handle error! 
        return {
            id: taskId,
            name: "Mock Draw It Game",
            description: "this is not a real game",
            words: ["Banana", "Trump", "Bicycle", "Pluto"]
        }

    } else {
        // Find by ID
        try {
            let drawit = fetch(url + '/games/drawit/' + taskId).then(res => res.json())
            console.log("FETCHED DRAW IT", alias);
            return drawit;
        } catch (error) {
            console.log(error)
            return null;
        }
    }
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
    } else if (data.gameType == "drawit") {
        await handleDrawItUpdateMessage(data);
    } else if (data.gameType == "quiz") {
        await handleQuizUpdateMessage(data);
    } else if (data.gameType == "truthlie") {
        await handleTruthlieUpdateMessage(data);
    } else {
        console.log("Unknown gameType: " + data.gameType);
    }
};

async function handleAliasUpdateMessage(data) {
    io.to(data.sessionId).emit("updateGame", data);
    openSessions.set(data.sessionId, data);
}

async function handleDrawItUpdateMessage(data) {
    io.to(data.sessionId).emit("updateGame", data);
    openSessions.set(data.sessionId, data);
}

async function handleTruthlieUpdateMessage(data) {
    io.to(data.sessionId).emit("updateGame", data);
    openSessions.set(data.sessionId, data);
}

function handleQuizUpdateMessage(data) {
    // Get new Questions!
    if (data.countDownStarted == true && data.quizes.length == 0) {
        var taskId;
        var hex = /[0-9A-Fa-f]{6}/g;
        if (data.taskId == null || data.taskId == undefined || data.taskId == "" || !hex.test(data.taskId)) {
            console.log("Invalid Task ID, sending random quiz");
            fetch(url + '/games/quiz/quizzes').then(res => res.json()).then(json => {
                taskId = json[Math.floor(Math.random() * json.length)]._id;
            }).then(() => {
                fetch(url + '/games/quiz/quizzes/' + taskId + '/questions').then(res => res.json()).then(json => {
                    json.forEach(question => {
                        var q = {
                            question: question.question,
                            answers: question.options,
                            correctAnswers: question.answer,
                            selectedAnswers: [],
                            type: question.type,
                            leftAnswers: question.options,
                            rightAnswers: []
                        };
                        data.quizes.push(q);
                    });
                    io.to(data.sessionId).emit("updateGame", data);
                    openSessions.set(data.sessionId, data);
                }).catch(err => console.log(err));

            }).catch(err => console.log(err));
        } else {
            taskId = data.taskId;
            fetch(url + '/games/quiz/quizzes/' + taskId + '/questions').then(res => res.json()).then(json => {
                json.forEach(question => {
                    var q = {
                        question: question.question,
                        answers: question.options,
                        correctAnswers: question.answer,
                        selectedAnswers: [],
                        type: question.type,
                        leftAnswers: question.options,
                        rightAnswers: []
                    };
                    data.quizes.push(q);
                });
                io.to(data.sessionId).emit("updateGame", data);
                openSessions.set(data.sessionId, data);
            }).catch(err => console.log(err));
        }


    } else {
        // TODO Maybe get answers later
        io.to(data.sessionId).emit("updateGame", data);
        openSessions.set(data.sessionId, data);
    }
}

// For Quiz give students also the correct result
// For Alias and Drawit just forward the number of correct words!
function handlePlayerResultMessage(data) {
    if (data.gameType == "alias" || data.gameType == "drawit") {
        console.log("Send gameResult for " + data.gameType);
        io.to(data.sessionId).emit("gameResult", data);
        openSessions.set(data.sessionId, data);
    } else if (data.gameType == "quiz") {
        console.log("Got quiz Result. TODO");
    }
};