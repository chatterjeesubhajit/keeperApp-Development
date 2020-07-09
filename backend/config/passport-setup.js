const passport = require("passport");
const FbStrategy = require('passport-facebook').Strategy;
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
  User.findOrCreate({displayName:profile.displayName,loginMethod:"facebook", userId: profile.id}, function (err, user) {
    return cb(err, user);
  });
}));
