const dotenv = require('dotenv');
dotenv.config({ path: '../.env'});
const router = require("express").Router();
const passport = require("passport");
const User = require("../models/users");
console.log(process.env.NODE_ENV);

const CLIENT_HOME_PAGE_URL = process.env.NODE_ENV ==='production'?"/home/":"http://localhost:3000/home/";
const CLIENT_LOGIN_PAGE_URL = process.env.NODE_ENV ==='production'?"/":"http://localhost:3000/";


// when login is successful, retrieve user info
router.get("/login/success", (req, res) => {
  console.log("incoming user data");
  console.log(req.user);
  if(req.isAuthenticated())
  {
    console.log("user is authenticated, below are details");
    console.log(req.user);
    console.log("session details");
    console.log(req.session);
      User.findOne({username:req.user.username},(err,obj)=>{
        let userNotes=[];
        if(!err){
          if(obj)
          {
            userNotes=obj.notes;
          }
          res.json({
          success: true,
          message: "user has successfully authenticated",
          user: req.user,
          cookies: req.cookies,
          notes:userNotes
            }); 
          }
      })
  }
    else
    {
      res.json({
        success: false,
        message: "user authentication failed",
        user: {},
        cookies: {},
        notes:[]
          }); 
    }
  });


// when login failed, send failed msg
router.get("/login/failed", (req, res) => {
    res.status(401).json({
      success: false,
      message: "user failed to authenticate."
    });
  });

  // When logout, redirect to client
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(CLIENT_LOGIN_PAGE_URL);
  });


  
router.get('/facebook',
passport.authenticate('facebook'));


router.get("/google",
  passport.authenticate('google', { scope: ["profile"],accessType: 'offline',
  prompt: 'consent'})
);


// redirect to home page after successfully login via facebook

router.get("/facebook/redirect",
passport.authenticate('facebook', { failureRedirect: '/auth/login/failed' }),
function(req, res) {
  console.log(`${CLIENT_HOME_PAGE_URL}${req.user.displayName}`);
  res.redirect(`${CLIENT_HOME_PAGE_URL}${req.user.displayName}`);
});



router.get("/google/redirect",
  passport.authenticate('google', { failureRedirect: '/auth/login/failed' }),
  function(req, res) {
    console.log(`${CLIENT_HOME_PAGE_URL}${req.user.displayName}`);
    res.redirect(`${CLIENT_HOME_PAGE_URL}${req.user.displayName}`);
  });


router.post("/register",(req,res)=>{
  let displayname=req.body.firstname+" "+req.body.lastname;
  User.register({username:req.body.username,displayName:displayname,loginMethod:"email"},req.body.password,
    function(err,user){
      if (err) {
        console.log(err)
        res.json({
          status:false,
          message:"unable to sign-up"
      })
    }
    else {
      passport.authenticate("local")(req,res,function(){
        res.json({
          status:true,
          message:"succcess"
      })
      });
    }
  });
  });

  router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) res.send({authenticate:false});
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.send({authenticate:true,displayName:req.user.displayName});
          console.log(req.user);
        });
      }
    })(req, res, next);
  });


  module.exports = router;