const mongoose = require('mongoose');
var Post = require('../models/post');

module.exports.savePost = (req, res, next) => {
    // call for passport authentication
    var newPost = new Post({
        email: req.body.email,
        name: req.body.name,
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

module.exports.getPosts = (req, res, next) => {
    console.log('user in post controller: ',req.params.currentUser);
    let posts = Post.find({email:{$ne: req.params.currentUser}}).limit(10).sort({$natural:-1});
    posts.exec((req, doc) =>{
        console.log('Posts are from post.controller using mongoose orm', doc);
        return res.status(200).json(doc);
    })
}