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
    const bookLink = '/books/' + req.payload.id + '/' + req.query.title.trim() + ".pdf";
    const book = {
        title: req.query.title.trim(),
        genre: req.query.genre,
        description: req.query.description,
        link: bookLink,
        UserId: req.payload.id
    }

    const bookFile = req.files.bookFile;
    //apparently express-fileupload package doesn't automatically create directorys for us. yay.
    fs.mkdir("./books/books/" + req.payload.id.toString(), (err) => {
        if ((err) && (err.code !== 'EEXIST')) {
            console.error(err)
        } else {
            const bookPath = './books/books/' + req.payload.id + '/' + req.query.title.trim() + ".pdf";
            // console.log("dir created");
            bookFile
                .mv(bookPath)
                .then((response) => {
                    // console.log("file saved");
                    db.PublishedBooks
                        .create(book)
                        .then((resp) => {
                            // console.log("book saved to DB");
                            res.status(200).json({ message: "Upload successful!" });
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
        }
    })
});

router.get("/search", (req, res) => {
    let searchParams = {
        where: {},
        attributes: {
            exclude: ["createdAt", "updatedAt", "UserId"]
        },
        include: [{
            model: db.User,
            attributes: ["id", "username"]
        }]
    }
    if (req.query.bookId) {
        searchParams.where.id = req.query.bookId
    }
    if (req.query.title) {
        searchParams.where.title = {
            [Op.like]: '%' + req.query.title + '%'
        }
    }
    if (req.query.genre) {
        const genres = req.query.genre.split(',').map((elem) => {
            return '%' + elem + '%'
        });
        if (genres.length > 1) {
            const opLikes = genres.map((elem) => {
                return { [Op.like]: elem }
            })
            searchParams.where.genre = {
                [Op.or]: opLikes
            }
        } else {
            searchParams.where.genre = {
                [Op.like]: genres[0]
            }
        }
    }
    if (req.query.author) {
        searchParams.include[0].where = {
            username: {
                [Op.like]: '%' + req.query.author + '%'
            }
        }
    }
    console.log(searchParams)
    db.PublishedBooks
        .findAll(searchParams)
        .then((response) => {
            res.json({
                success: true,
                response: response
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Error (500): Internal Server Error", error: err })
        })
})

router.put("/update/:id", (req, res) => {
    db.PublishedBooks
        .findOne({ where: { id: req.params.id }})
        .then((findResponse) => {
            const bookPath = '/books/' + req.payload.id + '/' + req.query.title.trim() + ".pdf"
            let book = {
                title: req.query.title.trim(),
                genre: req.query.genre.trim(),
                description: req.query.description.trim(),
            }
            if ((req.files) && (req.files.bookFile)) {
                book.link = bookPath;
            }
            db.PublishedBooks
            .update(
                book,
                { where: { id: req.params.id }}
            )
            .then((updateResponse) => {
                if ((req.files) && (req.files.bookFile)) {
                    fs.unlink("./books" + findResponse.link, (error) => {
                        if (error) {
                            console.error(error)
                            res.status(500).json({ error: error, message: "Error while trying to delete old book!" })
                        } else {
                            req.files.bookFile
                                .mv("./books" + book.link)
                                .then((mvResponse) => {
                                    res.json({ success: true })
                                })
                                .catch((err) => {
                                    console.error(err)
                                    res.status(500).json({ error: err, message: "Error while saving new book file!" })
                                })
                        }
                    })
                } else {
                    res.json({ success: true })
                }
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ error: err, message: "Error updating database!" })
            })
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err, message: "Book not found!" })
        })
})
router.delete("/delete/:id", (req, res) => {
    db.PublishedBooks
        .findOne({ where: { id: req.params.id }})
        .then(function(response) {
            fs.unlink("./books" + response.link, function(error) {
                if (error) {
                    res.status(500).json({error: error, message: "Error while trying to delete book from server." })
                }
                else {
                    db.PublishedBooks
                        .destroy({ where: { id: req.params.id }})
                        .then(function (resp) {
                            res.json({ success: true });
                        })
                        .catch(err => {
                            console.error(err);
                            res.status(500).json({error: error, message: "Error while trying to remove book from database" });
                        });
                }
            })
        })
        .catch(function(error) {
            console.error(error);
            res.status(500).json({error: error, message: "Book not found!"})
        })
});

module.exports = router;