const db = require("./index");
const authHelpers = require("../auth/helpers");
const passport = require("../auth/local");
// const nodemailer = require('nodemailer'); const notifications =
// require('./Email/email')

function createUser(req, res, next) {
    const hash = authHelpers.createHash(req.body.password);
    console.log("create user hash:", hash);
    db
        .any(`INSERT INTO users (username, password_digest, email, fullName) 
        VALUES ($1, $2, $3, $4) RETURNING users.username, users.email, users.fullName`, [req.body.username, hash, req.body.email, req.body.fullName])
        .then((data) => {
            res
                .status(200)
                .json({data: data[0]})
            // welcomeNotification(data[0])
        })
        .catch(err => {
            console.log(err);
            res
                .status(500)
                .json({message: `failed${err}`})
        })
}

function logoutUser(req, res, next) {
    req.logout();
    res
        .status(200)
        .send("log out success");
};

const getUser = (req, res, next) => {
    console.log("REQQQ:", req)
    db
        .one("SELECT * FROM users WHERE username=${username}", req.user)
        .then(data => {
            res
                .status(200)
                .json({user: data});
        })
        .catch(err => {
            return next(err)
        })
};

module.exports = {
    createUser,
    logoutUser,
    getUser,
    // getUserID
};
