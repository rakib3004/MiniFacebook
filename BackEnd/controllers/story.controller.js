const mongoose = require('mongoose');
var Minio = require("minio");
var story = require('../models/story');
const crypto = require('crypto');

const server_ip = '127.0.0.1'
const accessKey = 'ulDoUo3BcZ0HK4P4'
const secretKey = 'JH4f31eN8YAg9kn3BQUsh3cuoVGPNedo'
const port = 9000

module.exports.saveStory = (async (req, res) => {
    //connect to minio
    const minioClient = new Minio.Client({
        endPoint: server_ip,
        port: port,
        useSSL: false,
        accessKey: accessKey,
        secretKey: secretKey
    });

    var uuidName = crypto.randomUUID();
    console.log(JSON.stringify(req.file))
    minioClient.fPutObject('stories', uuidName, req.file.path, function (err, objInfo) {
        if(err) {return console.log(err)}
    });

    //Create a new story and save to mongodb
    const newStory = new story({
        email: req.body.email,
        name: req.body.name,
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
