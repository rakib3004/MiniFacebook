const express = require('express');
const router = express.Router();
const multer = require('multer');
const ctrlUser = require('../controllers/user.controller');
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

router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);

module.exports = router;



