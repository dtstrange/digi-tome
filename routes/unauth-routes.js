var db = require("../models");
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
var authCtrl = require("../controller/auth/auth-ctrl.js");




//book search
router.get("/search", (req, res)=>{
    db.PublishedBooks.findAll({
        where:{
         title:req.body.title,
         [Op.or]:[
             {genre:req.body.genre},
             {username:req.body.author}
         ]   
        }
    });
});


module.exports = router;