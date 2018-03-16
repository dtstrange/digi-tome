const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;

// requirements
require("dotenv").config();
const express = require("express");
const stripe = require("stripe")(keySecret);
const path = require("path");
const jwt = require("express-jwt");
const authRoutes = require("./routes/auth-routes.js");
const unauthRoutes = require("./routes/unauth-routes.js");
const bookRoutes = require("./routes/book-routes.js");
const profileRoute = require("./routes/profile-routes.js");
const stripeRoutes = require("./routes/stripe-routes.js");
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
app.use(express.static(process.cwd() + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


//stripe engine
app.set("view engine", "pug");
//routes
app.use("/api", unauthRoutes);
app.use("/api/user", authRoutes);

app.use(jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
}));
app.use("/purchase", stripeRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/profile", profileRoute);


db.sequelize.sync({ force: isDev }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    })
});

app.listen(4567);
