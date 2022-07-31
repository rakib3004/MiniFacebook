const express = require('express');
const router = express.Router();
const multer = require('multer');
const ctrlUser = require('../controllers/user.controller');
const ctrPost = require('../controllers/post.controller');
const ctrStory = require('../controllers/story.controller');
const jwtHelper = require('../config/jwtHelper');

const app=express();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })

app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.post('/savePost', ctrPost.savePost);
router.post('/saveStory',upload.single("files"), ctrStory.saveStory);
router.get('/getPosts/:currentUser',ctrPost.getPosts);
router.get('/getStories/:currentUser',ctrStory.getStories);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);

module.exports = router;



