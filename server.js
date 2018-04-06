// requirements
require("dotenv").config();
const express = require("express");
const path = require("path");
const jwt = require("express-jwt");
const authRoutes = require("./routes/auth-routes.js");
const bookRoutes = require("./routes/book-routes.js");
const profileRoute = require("./routes/profile-routes.js");
const fileUpload = require('express-fileupload');

//middleware
const bodyParser = require('body-parser');


//express setup
const app = express();
const PORT = process.env.PORT || 3001;
const isDev = process.env.NODE_ENV === 'development';

//fileupload middleware
app.use(fileUpload())
// Requiring our models for syncing
const db = require(path.join(__dirname, '/models'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//routes
app.use(express.static(path.join(process.env.PWD, 'public')));
app.use("/api/user", authRoutes);
app.use(express.static(path.join(process.env.PWD, 'books')));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(process.env.PWD, 'client/build')));
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '/client/build/index.html'));
    });
    app.get('/profile', (req, res) => {
        res.sendFile(path.join(__dirname, '/client/build/index.html'));
    });
    app.get('/profile/:username', (req, res) => {
        res.sendFile(path.join(__dirname, '/client/build/index.html'));
    });
    app.get('/search', (req, res) => {
        res.sendFile(path.join(__dirname, '/client/build/index.html'));
    });
    app.get('/book/:bookId', (req, res) => {
        res.sendFile(path.join(__dirname, '/client/build/index.html'));
    });
    app.get('/upload', (req, res) => {
        res.sendFile(path.join(__dirname, '/client/build/index.html'));
    });
}

app.use(jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
}));
app.use("/api/books", bookRoutes);
app.use("/api/profile", profileRoute);

db.sequelize.sync({ force: isDev }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    })
});


