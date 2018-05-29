const db = require("./index");
const authHelpers = require("../auth/helpers");
const passport = require("../auth/local");

//Creates new user
const createUser = (req, res, next) => {
    const hash = authHelpers.createHash(req.body.password);
    console.log("create user hash:", hash);
    db
        .any(`INSERT INTO users (username, password_digest, email, fullName) 
        VALUES ($1, $2, $3, $4) RETURNING users.username, users.email, users.fullName`, [req.body.username, hash, req.body.email, req.body.fullName])
        .then((data) => {
            res
                .status(200)
                .json({data: data[0]})
        })
        .catch(err => {
            console.log(err);
            res
                .status(500)
                .json({message: `failed${err}`})
        })
}

//Logs out user
const logoutUser = (req, res, next) => {
    req.logout();
    res
        .status(200)
        .send("log out success");
};

//Grabs user information
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

//Grabs all of the notes in the database
const getNotes = (req, res, next) => {
    db
        .any("SELECT title, note FROM notes WHERE user_id = ${id}", req.user)
        .then(data => {
            res
                .status(200)
                .json({user: data})
        })
        .catch(err => {
            return next(err);
        })
}

const postNote = (req, res, next) => {
    console.log('REQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ', req.user)
    db
        .none("INSERT INTO notes (title, note, user_id) VALUES (${title}, ${note}, ${user_id})", {
        title: req.body.title,
        note: req.body.note,
        user_id: req.user.id
    })
        .then((data) => {
            res.status(200)
            // .json({data: data[0]})
        })
        .catch(err => {
            return next(err)
        })
}

module.exports = {
    createUser,
    logoutUser,
    getUser,
    getNotes,
    postNote
    // getUserID
};
