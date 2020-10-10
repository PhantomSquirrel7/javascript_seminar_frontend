const express = require('express');
const cors = require('cors');
const app = express();


// app.use(express.static("./dist"));
app.use(express.static(__dirname + "/dist/"));


app.use(cors());

app.get("/*", function(req, res) {
    res.sendFile("index.html", {
        root: "dist",
    });
});

app.listen(process.env.PORT || 8080);


// Copied form Backend
// const express = require("express");
const path = require("path");
const config = require("./config");
// const app = express();
// const http = require('http').Server(app);
const mongoose = require('mongoose');
const games = require('./gameLogic.js');

const INDEX = "./public/index.html";
const PORT = 55555;
const ioApp = express();
// const cors = require('cors');
ioApp.use(cors());
app.use(cors());
// const ioServer = ioApp.use((req, res) => res.sendFile(INDEX, { root: __dirname }))
//     .listen(PORT, () => console.log(`Listening on ${PORT}`));
const iohttp = require('http').Server(ioApp);
iohttp.listen(55555);
games.gameInit(iohttp);

// Swagger
const swaggerUi = require("swagger-ui-express");
const YAML = require('yamljs');
const { json } = require("express");
const { send } = require("process");
const swaggerDocument = YAML.load('./swagger/docs/components.yaml');
app.use("/games/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// test request
app.get("/api/test_template", (req, res) => {
    const template_test = require("./templates/test.json");
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


//quizz question schema
const questionSchema = new mongoose.Schema({
    question: String,
    options: String,
    answer: Number
});

const question = mongoose.model("QuizQuestion", questionSchema);

//alias game schema 
const aliasSchema = new mongoose.Schema({
    name: String,
    description: String,
    words: Object,
    versionKey: false
});

const aliasGame = mongoose.model("Alias", aliasSchema);



//api calls for quizz
// @swagger
app.get('/questions', (req, res) => {

})

// @swagger
app.get('/questions/:id', (req, res) => {

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
app.post('/games/alias/create', (req, res) => {
    const newGame = new aliasGame(req.body);
    newGame.save((err, newGame) => {
        if (err) return console.error(err);
        else {
            console.log(`Game with id ${newGame.get('_id')} saved`);
            res.status(201).json(newGame.toJSON());
        }
    });
});

// @swagger
app.put('/games/alias/:id', (req, res) => {

    aliasGame.findByIdAndUpdate(req.params.id, { name: req.body.name, description: req.body.description, words: req.body.words }, (err, game) => {
        if (err)
            return console.error(err);
        else {
            console.log(`Game with id ${req.params.id} updated`);
            res.sendStatus(204);
        }
    })
});

// @swagger
app.delete('/games/alias/:id', (req, res) => {
    aliasGame.deleteOne({ _id: req.params.id }, (err, game) => {
        if (err) return console.error(err);
        else {
            console.log(`game with id ${req.params.id} deleted`)
            res.sendStatus(200)
        }
    })
});