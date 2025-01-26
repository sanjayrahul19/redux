const express = require('express');
const { createPost, getPost } = require('../controller/post.js');
const { verify } = require('../middleware/index.js');
const postRouter = express.Router();

postRouter.post('/create',verify,createPost)
postRouter.get('/get', verify, getPost);

module.exports = postRouter;
