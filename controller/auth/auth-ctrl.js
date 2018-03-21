const models = require("../../models");
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const ctrl = {};

function getHash(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}
function getSalt() {
    return crypto.randomBytes(16).toString("hex");
}
function generateJWT(user) {
    let expire = new Date();
    expire.setDate(expire.getDate()+7);
    return jwt.sign({
        id: user.id,
        email: user.email,
        exp: expire.getTime()/1000
    }, process.env.JWT_SECRET);
}
ctrl.login = function(req, res) {
    let user = req.body.user;
    let password = req.body.password;
    models.User.findOne({where: {
        [Op.or]: [{
            email: user
        },{
            username: user
        }]  
}})
    .then(function(resp) {
        if(resp) {
            //login
            var inputHash = getHash(password, resp.salt);
            console.log(inputHash.toString(), resp.hash);
            if(inputHash === resp.hash) {
                res.json({token: generateJWT(resp)});
            }
            else {
                return res.status(400).end('Wrong Password');
            }
        }
        else {
            //err
            return res.status(404).end('User not found');
        }
    })
    .catch(function(err) {
        console.log(err);
        res.status(500).json({message:'Something went wrong', error: err})
    })
};
ctrl.register = function(req, res) {
    console.log("register")
    var user = {
        username: req.body.username.trim(),
        email: req.body.email.trim().toLowerCase()
    }
    var salt = getSalt();
    var hash = getHash(req.body.password, salt);
    user.salt = salt;
    user.hash= hash;
    models.User.create(user)
    .then(function(resp) {
        res.json({success: true});
    })
    .catch(function(err) {
        console.error(err);
        return res.status(500).end('Registration FAILED' + err.toString());
        throw err;
    });
};

ctrl.update = function(req, res) {
    console.log("update")
    var user = {
        username: req.body.username.trim(),
        email: req.body.email.trim().toLowerCase()
    }
    var salt = getSalt();
    var hash = getHash(req.body.password, salt);
    user.salt = salt;
    user.hash= hash;
    models.User.update(user, {where: {id: req.params.id}})
    .then(function(resp) {
        res.json({success: true});
    })
    .catch(function(err) {
        console.error(err);
        return res.status(500).end('Update FAILED' + err.toString());
        throw err;
    });
};





module.exports = ctrl;
