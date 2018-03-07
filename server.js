// requirements
require("dotenv").config();
const express = require("express");
const path = require("path");

const jwt = require("jsonwebtoken");
const authRoutes = require("./routes/auth-routes.js");
const unauthRoutes = require("./routes/unauth-routes.js");
const bookRoutes = require("./routes/book-routes.js");

//middleware
const bodyParser = require('body-parser');

//express setup
const app = express();
const PORT = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV === 'development';
// Requiring our models for syncing
const db = require(path.join(__dirname, '/models'));

app.use(express.static(process.cwd() + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use("/api", unauthRoutes);
app.use("/api/user", authRoutes);
var auth = function (req, res, next) {
    console.log(`cookie: ${JSON.stringify(req.cookies)}`)
    try {
        console.log("COOKIE AUTH", req.get("Authorization"));
    
        var token = req.cookies.token || req.get("Authorization").split(" ")[1]
        console.log(token);
        try {
            console.log("we trying")
            jwt.verify(token, process.env.JWT_SECRET);
            next();
        } catch (err) {
            console.log("we failin", err)
            throw new Error("Not Authenticated");
        }
    } catch (err) {
        console.log("something is really wrong", err)
        throw new Error("Not Authenticated");
    }

}

app.use(auth);
app.use("/api/books", bookRoutes);


db.sequelize.sync({ force: isDev }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    })
});
