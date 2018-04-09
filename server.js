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
app.use(express.static(path.join(__dirname, 'public')));
app.use("/api/user", authRoutes);
app.use(express.static(path.join(__dirname, 'books')));

if (process.env.NODE_ENV === 'production') {
    // console.log(__dirname, "\n", process.cwd())
    app.use(express.static(path.join(__dirname, 'client/build')));
    // app.get(['/','/profile','/profile/:username','/search','/book/:bookId','/upload'], (req, res) => {
    //     res.sendFile(path.join(__dirname, '/client/build/index.html'));
    // });
}

app.use("/api", jwt({
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


