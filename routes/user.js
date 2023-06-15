const express = require("express");

const {getUser , getUserFriends , addRemoveFriends} =  require("../controllers/user.js")

const verifyToken  = require("../middlewares/auth.js");

const router = express.Router();


// the read routes where we grab the information from the database

/*Read */
router.get("/:id" , verifyToken , getUser);
router.get(":/id/friends" , verifyToken , getUserFriends);
// updating the user friends
// here we need both the friend and the user id
router.patch("/:id/:friendId" , verifyToken , addRemoveFriends);


module.exports = router;