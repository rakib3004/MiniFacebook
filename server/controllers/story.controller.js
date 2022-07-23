const mongoose = require('mongoose');
var Minio = require("minio");
var story = require('../models/story');
const crypto = require('crypto');

module.exports.saveStory = (async (req, res) => {

    const minioClient = minio();
    //PutObject(bucketName, objectName, stream, size, metaData[, callback])

    var uuidName = crypto.randomUUID();
    console.log(JSON.stringify(req.file))
    minioClient.fPutObject('stories', uuidName, req.file.path, function (err, objInfo) {

        if (err) {
            return console.log(err)
        }
    });

    //Create a new story
    const newStory = new story({
        name: req.body.name,
        storyUUID: uuidName
    });

    try {
        const savedStory = await newStory.save();
        res.send({ story: 'Uploaded Successfully' });
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports.getStories = (async (req,res) =>{
    try{
        const allStory = await story.find({name:{$ne: req.params.currentUser}}).sort({"time":-1}).limit(10);       // -1 means descending
        res.send(allStory);
    } catch(err){
        res.status(400).send({Fail: 'Image not found'});
    }
});

function minio() {
    return new Minio.Client({
        endPoint: '127.0.0.1',
        port: 9000,
        useSSL: false,
        accessKey: 'p5K6iMr8vA5OkthO',
        secretKey: 'nSFvxXOh8U6me3GKadM0f8N4RarvfEo3'
    });
}