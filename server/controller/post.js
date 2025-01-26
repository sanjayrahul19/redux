const User = require('../schema/index.js');
const Post = require("../schema/post.js");

const createPost = async(req,res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.create({ title, content, user: req.user._id });
    return res.status(200).json({ message: 'Post created successfully', data:post });
  } catch (error) {
 res.status(500).json({ message: error.message });
  }
}

const getPost = async (req, res) => {
 try {
   const post = await Post.find({ user: req.user._id }).populate(
     'user',
     '-password',
   ).sort({createdAt:-1});
   return res
     .status(200)
     .json({ message: 'Post sent successfully', data: post });
 } catch (error) {
   res.status(500).json({ message: error.message });
 }
}


module.exports = { createPost, getPost };
