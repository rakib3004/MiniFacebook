const mongoose = require('mongoose');
var Minio = require("minio");
var story = require('../models/story');
const crypto = require('crypto');

module.exports.saveStory = (async (req, res) => {
    //connect to minio
    const minioClient = new Minio.Client({
        endPoint: '127.0.0.1',
        port: 9000,
        useSSL: false,
        accessKey: 'p5K6iMr8vA5OkthO',
        secretKey: 'nSFvxXOh8U6me3GKadM0f8N4RarvfEo3'
    });

    var uuidName = crypto.randomUUID();
    console.log(JSON.stringify(req.file))
    minioClient.fPutObject('stories', uuidName, req.file.path, function (err, objInfo) {
        if(err) {return console.log(err)}
    });

    //Create a new story and save to mongodb
    const newStory = new story({
        email: req.body.email,
        storyUUID: uuidName
    });

    try {
        const savedStory = await newStory.save();
        res.send({ ResponeseMessage: 'Story file Uploaded Successfully' });
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports.getStories = (async (req,res) =>{
    try{
        const Stories = await story.find({email:{$ne: req.params.currentUser}}).sort({$natural:-1}).limit(10); 
        res.send(Stories);
    } catch(err){
        res.status(400).send({ResponeseMessage: 'Missing Image File'});
    }
});
