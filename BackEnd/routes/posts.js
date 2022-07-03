var express = require('express');
var router = express.Router();
var Post = require('../models/post');

router.post('/savePost', function (req, res, next) {
    console.log(req.body);
    addToDB(req, res);
})
  
async function addToDB(req, res) {

  var newPost = new Post({
      email: req.body.email,
      username: req.body.username,
      text: req.body.text,
      creation_dt: Date.now()
  });

  let promise = newPost.save();

  promise.then((doc=>{
      return res.status(201).json(doc);
  }))

  promise.catch((err=>{
      return res.status(501).json(err);
  }))

}

router.get('/getPost', async function (req, res, next) {
    console.log(req.body);
    const posts = await Post.find();
    res.send(posts);
})

module.exports = router;