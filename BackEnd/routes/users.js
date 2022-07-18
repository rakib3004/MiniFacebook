var express = require('express');
var router = express.Router();
var User = require('../models/user');
const bcrypt = require("bcrypt");



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
  if(tempUser && await bcrypt.compare(req.body.password,tempUser.password)){
    return true;
  }
  else return false;
}

router.post('/login',function(req,res,next){
  isvalid = authenticate(req,res);
  console.log(isvalid);
  res.send()

    // passport.authenticate('local', function(err, user, info) {
    //   if (err) { return res.status(501).json(err); }
    //   if (!user) { return res.status(501).json(info); }
    //   req.logIn(user, function(err) {
    //     if (err) { return res.status(501).json(err); }
    //     return res.status(200).json({message:'Login Success'});
    //   });
    // })(req, res, next);
  });

module.exports = router;