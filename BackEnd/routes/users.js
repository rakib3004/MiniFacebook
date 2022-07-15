var express = require('express');
var router = express.Router();
var User = require('../models/user');



router.post('/register', function (req, res, next) {
    console.log(req.body);
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

async function authenticate(req,res){
  if(await User.findOne({email:req.body.email, password:req.body.password})){
    res.send(true);
  }
}

router.post('/login',function(req,res,next){
  console.log(req.body);

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