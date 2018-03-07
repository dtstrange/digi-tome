var db = require("../models");
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
var authCtrl = require("../controller/auth/auth-ctrl.js");

router.post("/upload", (req,res)=>{
    var book = {
        title: req.body.title.trim(),
        genre: req.body.genre,
        pageCount: req.body.pageCount.trim()
    }
    
    db.PublishedBooks.create(book)
    .then(function(resp) {
        res.json({success: true});
    })
    .catch(err =>{
        console.error(err);
        return res.status(500).end('Book upload failed' + err.toString());
    });
});

router.put("/upload/:id", (req,res)=>{
    var book = {
        title: req.body.title.trim(),
        genre: req.body.genre,
        pageCount: req.body.pageCount.trim()
    }
    
    db.PublishedBooks.update({book, where:{
        id: req.param.id
    }})
    .then(function(resp) {
        res.json({success: true});
    })
    .catch(err =>{
        console.error(err);
        return res.status(500).end('Book update failed' + err.toString());
    });
});

router.put("/delete/:id", (req,res)=>{
    var book = {
        title: req.body.title.trim(),
        genre: req.body.genre,
        pageCount: req.body.pageCount.trim()
    }
    
    db.PublishedBooks.destroy({where:{
        id: req.param.id
    }})
    .then(function(resp) {
        res.json({success: true});
    })
    .catch(err =>{
        console.error(err);
        return res.status(500).end('Book delete failed' + err.toString());
    });
});

module.exports = router;