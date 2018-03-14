const db = require("../models");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const authCtrl = require("../controller/auth/auth-ctrl.js");
const fs = require('fs');
 


// router.post("/upload", (req,res)=>{
//     var book = {
//         title: req.body.title.trim(),
//         genre: req.body.genre,
//         price: req.body.pageCount.trim(),
//         description: req.body.description,
//         link: '/books/' + req.body.userId + '/' + req.body.title.trim()
//     }
    
//     db.PublishedBooks.create(book)
//     .then(function(resp) {
//         res.json({success: true});
//         if (!req.files)
//             return res.status(400).send('No files were uploaded.');

//         let book = req.files.book;

//         book.mv('/books/' + req.body.userId + '/' + req.body.title.trim() + '/' + resp.id + ".pdf", function(err) {
//             if (err)
//               return res.status(500).send(err);
        
//             res.send('File uploaded!');
//           });

//     })
//     .catch(err =>{
//         console.error(err);
//         return res.status(500).end('Book upload failed' + err.toString());
//     });
// });

router.post("/upload", (req,res)=>{
    var data = "";
    console.log(req.query);
    //query error handling
    
    req.on('data', function (chunk) {
        console.log("data")
        data += chunk;
    });

    req.on('end', function () {
        console.log("done baby")
        fs.mkdir("./books/" + req.payload.id.toString(), () => {
            fs.writeFile('./books/' + req.payload.id + '/' + req.query.title + '.pdf', data, (err) => {
                if (err) throw err;
            
            })
        })
        
        console.log('File uploaded');
        res.writeHead(200);
        res.end();
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