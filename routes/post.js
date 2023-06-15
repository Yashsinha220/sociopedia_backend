const express = require('express')
const {getFeedPosts , getUserPosts , likePost} = require("../controllers/post.js")

const verifytoken = require("../middlewares/auth.js");


const router = express.Router();

router.get("/" , verifytoken , getFeedPosts);
router.get("/:userId/posts" , verifytoken , getUserPosts);
router.patch("/:id/like" , verifytoken , likePost);


module.exports = router;