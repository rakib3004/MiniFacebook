var express = require('express');
var router = express.Router();
var User = require('../models/user');
const bcrypt = require("bcrypt");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const { findOne, findById } = require('../models/user');
dotenv.config();

router.post('/register', function (req, res, next) {
    addToDB(req, res);
})
  
async function addToDB(req, res) {

  if(await User.findOne({email:req.body.email}))
  {
    console.log("Email Already Used");
    return res.send(false);
  }

  var user = new User({
      email: req.body.email,
      username: req.body.username,
      password: User.hashPassword(req.body.password),
      creation_dt: Date.now()
  });

  let promise = user.save();

  promise.then((doc=>{
      return res.status(201).json(doc);
  }))

  promise.catch((err=>{
      return res.status(501).json(err);
  }))

}

async function authenticate(req){
  tempUser = await User.findOne({email:req.body.email});
  if(tempUser && (await bcrypt.compare(req.body.password,tempUser.password))){
    return true;
  }
  else return false;
}

router.post('/login',function(req,res,next){
  isvalid = authenticate(req,res);
  console.log(isvalid);

  let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time: Date(),
        userId: 12,
    }
  
    const token = jwt.sign(data, jwtSecretKey);
  
    res.send(token);

  });



  router.get("/validateToken", async(req, res) => {
    // Tokens are generally passed in the header of the request
    // Due to security reasons.
  
    //let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
  
    try {
        //console.log(req.header('Authorization'))
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        //const token = req.header('Authorization');
        console.log(token);
        const verified = jwt.verify(token, jwtSecretKey);
        if(verified){
          console.log(verified.userId)
          user = await User.findOne({userId:verified.userId})
          console.log(user)
            return res.status(200).send(user);
        }else{
            // Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
});

module.exports = router;