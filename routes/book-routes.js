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

    let book = {}
    if (req.query.title) {
        book.title = req.query.title.trim();
        link = '/books/' + req.payload.id + '/' + req.query.title.trim() + ".pdf";
    }
    if (req.query.genre) {
        book.genre = req.query.genre.trim();
    }
    if (req.query.description) {
        book.description = req.query.description.trim();
    }
    db.PublishedBooks
        .findOne({ where: { id: req.params.id } })
        .then(function (findResponse) {
            db.PublishedBooks
                .update(
                    book,
                    { where: { id: req.params.id } }
                )
                .then(function (updateResponse) {
                    if ((req.query.title) && !((req.files) && (req.files.bookFile))) { //if title was changed and no new book uploaded
                        fs.rename(findResponse.link, book.link, function (error) {
                            if (error) {
                                res.status(500).json({ error: error, message: "Error while trying to rename file on server." })
                            }
                            else {
                                res.json({ success: true });
                            }
                        })
                    }
                    else if (!(req.query.title) && ((req.files) && (req.files.bookFile))) {//if title was unchanged but new book uploaded
                        req.files.bookFile
                            .mv(findResponse.link)
                            .then(function (mvResponse) {
                                res.json({ success: true });
                            })
                            .catch(function (error) {
                                res.status(500).json({ error: error, message: "Error while trying to upload new book file." })
                            })
                    }
                    else if ((req.query.title) && ((req.files) && (req.files.bookFile))) {//if title was changed and new book uploaded
                        fs.rename(findResponse.link, book.link, function (error) {
                            if (error) {
                                res.status(500).json({ error: error, message: "Error while trying to rename file on server." })
                            }
                            else {
                                req.files.bookFile
                                    .mv(book.link)
                                    .then(function (mvResponse) {
                                        res.json({ success: true });
                                    })
                                    .catch(function (error) {
                                        res.status(500).json({ error: error, message: "Error while trying to upload new book file." })
                                    })
                            }
                        })
                    }
                    else {//if title was unchanged and no new book uploaded
                        res.json({ success: true, foundResponse: findResponse, updateResponse: updateResponse });
                    }
                })
                .catch(err => {
                    console.error(err);
                    return res.status(500).end('Book update failed' + err.toString());
                });
        })
        .catch(function (error) {
            console.error(error);
            res.status(500).json({error: error, message: "Book not found!" })
        })
});

router.delete("/delete/:id", (req, res) => {
    db.PublishedBooks
        .findOne({ where: { id: req.params.id }})
        .then(function(response) {
            fs.unlink(response.link, function(error) {
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