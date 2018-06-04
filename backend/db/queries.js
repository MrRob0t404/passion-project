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
            return next(err);
        })
};

//Grabs all of the notes in the database
const getNotes = (req, res, next) => {
    db
        .any("SELECT title, note FROM notes WHERE user_id = ${id}", req.user)
        .then(data => {
            res
                .status(200)
                .json({user: data});
        })
        .catch(err => {
            return next(err);
        })
}

//Adds another note to the backend
const postNote = (req, res, next) => {
    console.log('REQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ', req.user)
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

const deleteNote = (req, res, next) => {
    console.log('REQQQ: ', req.body.title)
    db
        .none("DELETE FROM notes WHERE title = ${title}", {title: req.body.title})
        .then((data) => {
            res.status(200)
        })
        .catch(err => {
            return next(err)
        })
}

const getTodoList = (req, res, next) => {
    db
        .any("SELECT title, note FROM notes WHERE user_id = ${id}", req.user)
        .then(data => {
            res
                .status(200)
                .json({user: data});
        })
        .catch(err => {
            return next(err);
        })
}

//Creates new entry within the database
const postListTitle = (req, res, next) => {
    db
        .one("INSERT INTO todo (title, user_id) VALUES (${title}, ${user_id})RETURNING id, tit" +
            "le", {
        title: req.body.title,
        user_id: req.body.user_id
    })
        .then((data) => {
            console.log(data)
            res
                .status(200)
                .json({data: data})
        })
        .catch(err => {
            return next(err)
        })
}

const postListItems = (req, res, next) => {
    db
        .none("INSERT INTO todo_item (item, complete, todo_list_id) VALUES (${item}, ${complete" +
            "}, ${todo_list_id})", {
        item: req.body.item,
        complete: req.body.complete,
        todo_list_id: req.body.todo_list_id
    })
        .then((data) => {
            res.status(200)
            // .json({data: data[0]})
        })
        .catch(err => {
            return next(err)
        })
}
var sql = ``
const getListItems = (req, res, next) => {
    db
        .any(`SELECT user_id AS USERid_wHO_MADE_TODO, title AS TITLE_OF_TODO_LIST, item AS TODO_ITEM, todo.id AS TODO_LIST_ID_number, todo_item.todo_list_id,complete 
        FROM todo 
        JOIN todo_item ON todo.id = todo_item.todo_list_id WHERE todo.id = todo_list_id  AND user_id = $/user_id/;`, {user_id: req.user.id})
        .then((data) => {
            res
                .status(200)
                .json({data: data})
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
    postNote,
    deleteNote,
    postListTitle,
    postListItems,
    getListItems
};
