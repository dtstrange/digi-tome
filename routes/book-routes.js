const db = require("../models");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const authCtrl = require("../controller/auth/auth-ctrl.js");
const fs = require('fs');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//this turned out to be much simpler than expected.
//#programminglife
//#storyofmylife
//#fml
//#dafuqamidoingwithmylife
//#SRSLYDAFUQ
router.post("/upload", (req, res) => {
    const bookLink = './books/' + req.payload.id + '/' + req.query.title.trim() + ".pdf";
    const book = {
        title: req.query.title.trim(),
        genre: req.query.genre,
        price: req.query.price.trim(),
        description: req.query.description,
        link: bookLink,
        UserId: req.payload.id
    }

    const bookFile = req.files.bookFile;
    //apparently express-fileupload package doesn't automatically create directorys for us. yay.
    fs.mkdir("./books/" + req.payload.id.toString(), () => {
        // console.log("dir created");
        bookFile
            .mv(bookLink)
            .then((response) => {
                // console.log("file saved");
                db.PublishedBooks
                    .create(book)
                    .then((resp) => {
                        // console.log("book saved to DB");
                        res.status(200).json({ message: "Upload successful!"});
                    })
                    .catch((err) => {
                        console.error(err);
                        res.status(500).json({ message: "Internal server error.", error: err });
                    })
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ message: "Internal server error.", error: err });
            })
    })
});
router.get("/search", (req, res) => {
    if (req.query) {
        let searchParams = {}
        if (req.query.title) {
            searchParams.title = {
                [Op.like]: '%' + req.query.title + '%'
            }
        }
        if (req.query.genre) {
            const genres = req.query.genre.split(',').map((elem) => {
                return '%' + elem + '%'
            });
            console.log(genres);
            searchParams.genre = {
                [Op.in]: genres
            }
            //returns empty result
        }
        if (req.query.author) {
            searchParams.include = {
                model: db.User,
                where: {
                    username: {
                        [Op.like]: '%' + req.query.author + '%'
                    }
                }
            }
            //returns empty result
        }
        if (!(searchParams === {})) {
            console.log(searchParams);
            db.PublishedBooks
                .findAll({
                    where: searchParams,
                    attributes: {
                        exclude: ["link"]
                    }
                })
                .then((response) => {
                    console.log(response);
                    res.json({
                        success: true, 
                        response: response
                    });
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).json({message: "Error (500): Internal Server Error", error: err})
                })
        } else {
            res.status(404).json({message: "Error (404): No valid search params"})
        }
    } else {
        return res.status(404).json({message: "Error (404): No search parameters"});
    }
})
router.put("/upload/:id", (req, res) => {
    var book = {
        title: req.body.title.trim(),
        genre: req.body.genre,
        pageCount: req.body.pageCount.trim()
    }

    db.PublishedBooks.update({
        book, where: {
            id: req.param.id
        }
    })
        .then(function (resp) {
            res.json({ success: true });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).end('Book update failed' + err.toString());
        });
});

router.delete("/delete/:id", (req, res) => {
    var book = {
        title: req.body.title.trim(),
        genre: req.body.genre,
        pageCount: req.body.pageCount.trim()
    }

    db.PublishedBooks.destroy({
        where: {
            id: req.param.id
        }
    })
        .then(function (resp) {
            res.json({ success: true });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).end('Book delete failed' + err.toString());
        });
});

module.exports = router;