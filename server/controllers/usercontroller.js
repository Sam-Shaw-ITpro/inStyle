var express = require('express');
var router = express.Router()
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
// console.log('in usercontroller');

//CREATE EMPTY USER PROFILE HERE???
router.get('/all', (req, res) => {
    User.findAll()
        .then(
            function findAllSuccess(items) {
                res.status(200).json({
                    items
                })
            },

            function findAllError(err) {
                res.status(500).send("Something unexpected happened.")
            }
        )
})

// create user
router.post('/createuser', function (req, res) {
    var username = req.body.user.username;
    var pass = req.body.user.password;

    User.create({
        username: username,
        passwordhash: bcrypt.hashSync(pass, 10)

    }).then(
        function createSuccess(user) {
            var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
            res.json({
                user: user,
                message: 'created',
                sessionToken: token
            });
        },
        function createError(err) {
            res.send(500, err.message);
        }
    );
});

// login 
router.post('/login', function(req, res) {
    User.findOne( { where: { username: req.body.user.username } } ).then(
        function(user) {
            if (user) {
                bcrypt.compare(req.body.user.password, user.passwordhash, function(err, matches){
                    if (matches) {
                        var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24 });
                        res.json({
                            user: user,
                            message: "successfully authenticated",
                            sessionToken: token
                        });
                    }else {
                        res.status(502).send({ error: "you failed, yo" });
                    }
                });
            } else {
                res.status(500).send({ error: "failed to authenticate" });
            }
        },
        function(err) {
            res.status(501).send({ error: "you failed, yo" });
        }
    );
});

function userSignIn(){
    let userName = document.getElementById('userSignin').value; 
    let userPass = document.getElementById('passSignin').value;
    console.log(userName, userPass);
    
    let userData = {user : { username: userName, password: userPass}};
    fetch('http://localhost:3000/api/user/login', { //<---login route used
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(function (response) {
        console.log(response.sessionToken);
        let token = response.sessionToken;
        localStorage.setItem('SessionToken', token);
    });
}
module.exports = router;