const db = require("../models");
const express = require("express");
const router = express.Router();
const authCtrl = require("../controller/auth/auth-ctrl.js");

router.get("/:username", (req, res) => {
    db.User.findOne({
        where: { username: req.params.username },
        attributes: {
            exclude: ["salt", "hash", "updatedAt", "createdAt"]
        },
        include: [{
            model: db.PublishedBooks
        }]

    })
        .then(resp => {
            res.json(resp)
        })
        .catch(err => {
            console.error(err);
            return res.status(500).end("Can't find user" + err.toString());
        });
});

router.put("/:id", authCtrl.update);


module.exports = router;