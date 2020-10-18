const express = require('express');
const cors = require('cors');
const app = express();


app.use(express.static(__dirname + "/dist/"));

app.use(cors());

app.get("/", function(req, res) {
    res.sendFile("index.html", {
        root: "dist",
    });
});

var server = app.listen(process.env.PORT || 8080);

// Copied form Backend
const path = require("path");
var io = require('socket.io').listen(server);
const mongoose = require('mongoose');
const games = require('./gameLogic.js');

app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Swagger
const swaggerUi = require("swagger-ui-express");
const YAML = require('yamljs');
const { json } = require("express");
const { send } = require("process");
const swaggerDocument = YAML.load('./swagger/docs/components.yaml');
app.use("/games/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// test request
app.get("/api/test_template", (req, res) => {
    const template_test = require("./test.json");
    res.json(template_test);
});

//init body parser
app.use(express.json());

// set static folder
app.use(express.static(path.join(__dirname, "public")));

//connecting to the database
mongoose.connect('mongodb+srv://admin:H4WitQlot528tkUO@globygames.41wi7.mongodb.net/<GlobyGames>?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.set('useFindAndModify', false);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("database connected")
});


//alias game schema 
const aliasSchema = new mongoose.Schema({
    name: String,
    description: String,
    words: Object,
    versionKey: false
});

const aliasGame = mongoose.model("Alias", aliasSchema);


//draw it game schema 
const drawitSchema = new mongoose.Schema({
    name: String,
    description: String,
    words: Object,
    versionKey: false
});

const drawitGame = mongoose.model("DrawIt", drawitSchema);


//quizz game schema
const quizSchema = new mongoose.Schema({
    name: String,
    description: String,
    questions: Object
});
const quizGame = mongoose.model("QuizGame", quizSchema);

//quizz question schema
const questionSchema = new mongoose.Schema({
    type: String,
    name: String,
    question: String,
    options: Object,
    answer: Object
});
const quizQuestion = mongoose.model("QuizQuestion", questionSchema);



//api calls for quiz

// @swagger
app.get('/games/quiz/quizzes', (req, res) => {
    quizGame.find((err, games) => {
        if (err) return console.error(err);
        res.json(games);
    })
});

// @swagger
app.get('/games/quiz/quizzes/:id', (req, res) => {
    quizGame.findById(req.params.id, (err, game) => {
        if (err) {
            console.error(err);
            return res.sendStatus(404)
        }
        if (game == null) return res.sendStatus(404);
        var allquestions = [];
        game.questions.forEach(element => {
            quizQuestion.findById(element, (err1, qst) => {
                if (err1) console.error(err1);
                allquestions.push(qst.toJSON());
                if (allquestions.length === game.questions.length) {
                    game.questions = allquestions;
                    res.status(200).json(game.toJSON());
                }
            })
        });

    })

});


// @swagger
app.get('/games/quiz/quizzes/:id/questions', (req, res) => {
    quizGame.findById(req.params.id, (err, game) => {
        if (err) {
            console.error(err);
            return res.sendStatus(404)
        }
        if (game == null) return res.sendStatus(404);
        var allquestions = [];
        game.questions.forEach(element => {
            quizQuestion.findById(element, (err1, qst) => {
                if (err1) console.error(err1);
                allquestions.push(qst.toJSON());
                if (allquestions.length === game.questions.length) {
                    res.status(200).json(allquestions);
                }
            })
        });

    })
});


// @swagger
app.get('/games/quiz/questions', (req, res) => {
    quizQuestion.find((err, qst) => {
        if (err) return console.error(err);
        res.json(qst);
    })
});

// @swagger
app.get('/games/quiz/question/:id', (req, res) => {
    quizQuestion.findById(req.params.id, (err, qst) => {
        if (err || qst == null) {
            console.log(err);
            return res.sendStatus(404);
        }
        res.json(qst.toJSON());
    })
});

// @swagger
app.post('/games/quiz/create', (req, res) => {
    const newQuiz = new quizGame(req.body);
    newQuiz.save((err, qz) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        } else {
            res.status(200).json(qz.toJSON());
        }
    })
});

// @swagger
app.post('/games/quiz/question/create', (req, res) => {
    const newQst = new quizQuestion(req.body);
    newQst.save((err, qst) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        } else {
            res.status(200).json(qst.toJSON());
        }
    })
});

// @swagger
app.put('/games/quiz/:id', (req, res) => {
    quizGame.findByIdAndUpdate(req.params.id, { name: req.body.name, description: req.body.description, questions: req.body.questions }, { new: true }, (err, game) => {
        if (err || game == null) {
            console.error(err);
            return res.sendStatus(404);
        } else {
            res.json(game.toJSON());
        }
    })

});

// @swagger
app.put('/games/quiz/question/:id', (req, res) => {
    quizQuestion.findByIdAndUpdate(req.params.id, { type: req.body.type, name: req.body.name, question: req.body.question, options: req.body.options, answer: req.body.answer }, { new: true }, (err, qst) => {
        if (err || qst == null) {
            console.error(err);
            return res.sendStatus(404);
        } else {
            res.json(qst.toJSON());
        }
    })
});

// @swagger
app.delete('/games/quiz/:id', (req, res) => {
    quizGame.deleteOne({ _id: req.params.id }, (err, quiz) => {
        if (err) {
            console.error(err);
            res.sendStatus(404);
        } else {
            if (quiz == null) return res.sendStatus(404);
            res.sendStatus(200)
        }
    })

});

// @swagger
app.delete('/games/quiz/question/:id', (req, res) => {
    quizQuestion.deleteOne({ _id: req.params.id }, (err, qst) => {
        if (err) {
            console.error(err);
            res.sendStatus(404);
        } else {
            if (qst == null) return res.sendStatus(404);
            res.sendStatus(200)
        }
    })
});







//api calls for draw it

// @swagger
app.get('/games/drawit/games', (req, res) => {
    drawitGame.find((err, games) => {
        if (err) return console.error(err);
        res.json(games);
    })
});

// @swagger
app.get('/games/drawit/:id', (req, res) => {
    drawitGame.findById(req.params.id, (err, game) => {
        if (err || game == null) {
            console.log(err);
            return res.sendStatus(404);
        }
        res.json(game.toJSON());
    })
})

// @swagger
app.post('/games/drawit/create', (req, res) => {
    const newGame = new drawitGame(req.body);
    newGame.save((err, newGame) => {
        if (err || newGame == null) {
            console.error(err);
            res.sendStatus()
        } else {
            res.status(200).json(newGame.toJSON());
        }
    });
});

// @swagger
app.put('/games/drawit/:id', (req, res) => {
    drawitGame.findByIdAndUpdate(req.params.id, { name: req.body.name, description: req.body.description, words: req.body.words }, { new: true }, (err, game) => {
        if (err || game == null) {
            console.error(err);
            return res.sendStatus(404);
        } else {
            res.json(game.toJSON());
        }
    })

});

// @swagger
app.delete('/games/drawit/:id', (req, res) => {
    drawitGame.deleteOne({ _id: req.params.id }, (err, game) => {
        if (err) {
            console.error(err);
            res.sendStatus(404);
        } else {
            if (game == null) return res.sendStatus(404);
            res.sendStatus(200)
        }
    })
});








//api calls for alias

// @swagger
app.get('/games/alias/games', (req, res) => {
    aliasGame.find((err, games) => {
        if (err) return console.error(err);
        res.json(games);
    })
});

// @swagger
app.get('/games/alias/:id', (req, res) => {
    aliasGame.findById(req.params.id, (err, game) => {
        if (err || game == null) {
            console.log(err);
            return res.sendStatus(404);
        }
        res.json(game.toJSON());
    })
})

// @swagger
app.post('/games/alias/create', (req, res) => {
    const newGame = new aliasGame(req.body);
    newGame.save((err, newGame) => {
        if (err) return console.error(err);
        else {
            console.log(`Game with id ${newGame.get('_id')} saved`);
            res.status(200).json(newGame.toJSON());
        }
    });
});

// @swagger
app.put('/games/alias/:id', (req, res) => {

    aliasGame.findByIdAndUpdate(req.params.id, { name: req.body.name, description: req.body.description, words: req.body.words }, (err, game) => {
        if (err)
            return console.error(err);
        else {
            if (game == null) return res.sendStatus(404);
            console.log(`Game with id ${req.params.id} updated`);
            res.sendStatus(200);
        }
    })
});

// @swagger
app.delete('/games/alias/:id', (req, res) => {
    aliasGame.deleteOne({ _id: req.params.id }, (err, game) => {
        if (err) return console.error(err);
        else {
            if (game == null) return res.sendStatus(404);
            console.log(`game with id ${req.params.id} deleted`)
            res.sendStatus(200)
        }
    })
});



// Init games
games.gameInit(io);