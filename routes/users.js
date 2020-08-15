var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/user');

//passport for authentication
var passport = require('passport');

var router = express.Router();
router.use(bodyParser.json());

console.log("Users Ruter");

/* GET users listing. */
router.get('/', (req,res,next) => {
  User.find({})
  .then((users) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(users);
  }, (err) => next(err))
  .catch((err) => next(err));
});

router.post('/signup', (req, res, next) => {

  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {

    //if error occured in creating new user
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      //constructing json object with error value in response
      res.json({err: err});
    }
    else {

      //when user created successfully
      //set user details\
      user.email = req.body.username;
      if (req.body.firstname)
        user.firstname = req.body.firstname;
      if (req.body.lastname)
        user.lastname = req.body.lastname;

      //now save user after modification
      user.save((err, user) => {
        //if error occured in saving new user
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return ;
        }

        //when no error occured in saving new user, now authenticate the new user
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'Registration Successful!'});
        });
      })
    }
  });
});

router.post('/login', passport.authenticate('local'), (req, res) => {

  //creating token for authentication apart from auther authentication method(local strategy)\
  //getToken is defined in authenticate.js, here we give payload as id only
  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  //passing back token to the user in response
  res.json({success: true, token: token, status: 'You are successfully loged in'});
});

module.exports = router;
