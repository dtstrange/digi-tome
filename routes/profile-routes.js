const db = require("../models");
const express = require("express");
const router = express.Router();
const authCtrl = require("../controller/auth/auth-ctrl.js");

router.get("/user/:id", (req, res)=>{
    
    
    db.PublishedBooks.findAll({
         where:{UserId:req.params.id}
    })
    .then(bookResp =>{
        res.json(bookResp)
    })
    .catch(err => {
        console.error(err);
        return res.status(500).end("Can't find any books" + err.toString());
    });

    
});

router.get("/:id", (req,res)=>{
    console.log("test")
    db.User.findOne({
         where:{id: req.params.id}
    })
    .then(resp =>{
        res.json(resp)
    })
    .catch(err => {
        console.error(err);
        return res.status(500).end("Can't find user" + err.toString());
    });
});

router.put("/:id", authCtrl.update);


module.exports = router;