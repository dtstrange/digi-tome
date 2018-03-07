const db = require("../models");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const authCtrl = require("../controller/auth/auth-ctrl.js");
const fileUpload = require('express-fileupload');


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

router.delete("/delete/:id", (req,res)=>{
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