const express = require('express');
const router = express.Router();
const {loginRequired} = require("../auth/helpers");
const passport = require("../auth/local");
const db = require("../db/queries");

// USER LOGIN ROUTES
router.post("/login", passport.authenticate("local"), (req, res) => {
  // console.log('this is what the DB returned', req.user);
  res
    .status(200)
    .json({user: req.user, message: `${req.user.username} is logged in`});
  return;
});
router.get("/getLoggedinUser", loginRequired, db.getUser);
router.post("/new", db.createUser);
router.get("/logout", loginRequired, db.logoutUser);
router.get("/getNotes", db.getNotes)
router.post("/postNote", db.postNote);
router.post("/deleteNote", db.deleteNote);
router.post("/postListTitle", db.postListTitle);
router.post("/postListItems", db.postListItems);

// router.get("/getUserID/:username", db.getUserID);
// router.get("/profile/:username", db.getUserProfile);

module.exports = router;