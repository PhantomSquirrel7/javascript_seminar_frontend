const express = require('express');
const cors = require('cors');
const app = express();


// app.use(express.static("./dist"));
app.use(express.static(__dirname + "/dist/"));
app.use(cors());
app.options('*', cors())

app.get("/*", function(req, res) {
    res.sendFile("index.html", {
        root: "dist",
    });
});

app.listen(process.env.PORT || 8080);