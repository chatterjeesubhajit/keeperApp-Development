const passport = require("passport");
const FbStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require('dotenv');
dotenv.config({ path: '../.env'});
const User = require("../models/users");


passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      if (!err){done(err, user);}
      else {done(new Error("Failed to deserialize an user"));}
    });
  });

  
passport.use(new FbStrategy({
  clientID: process.env.FB_CLIENT_ID,
  clientSecret: process.env.FB_CLIENT_SECRET,
  callbackURL: "/auth/facebook/redirect",
  // profileFields: ['id', 'displayName', 'photos', 'email'],
  enableProof: true
},
function(accessToken, refreshToken, profile, cb) {
  console.log(profile);
  User.findOrCreate({displayName:profile.displayName,loginMethod:"facebook", username: profile.id}, function (err, user) {
    return cb(err, user);
  });
}));

passport.use(new GoogleStrategy({
  clientID: process.env.G_CLIENT_ID,
  clientSecret: process.env.G_CLIENT_SECRET,
  callbackURL: "/auth/google/redirect",
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
  passReqToCallback: true,
  accessType:'offline'
},
function(accessToken, refreshToken,params, profile, cb) {
  console.log(profile);
  // console.log("access token: ",accessToken);
  console.log("refresh token: ",refreshToken);
  console.log("params :",params);

  User.findOrCreate({displayName:profile.displayName,loginMethod:"google", username: profile.id}, function (err, user) {
    return cb(err, user);
  });
}
));
