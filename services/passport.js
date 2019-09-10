const passport = require ('passport');
const GoogleStrategy = require ('passport-google-oauth20').Strategy;
const keys = require ('../config/keys');
const mongoose = require ('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});
//this defines a function that allows us to take a user model and generate an identifying piece of info that we can give to passport to generate a cookie

passport.deserializeUser((id, done)=> {
  User.findById(id)
    .then (user =>{
      done(null, user)
    });
});
//this pulls the user model out of the cookie

passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback',
  proxy: true
},
  (accessToken, refreshToken, profile, done) => {
    User.findOne({googleId: profile.id}).then(existingUser => {
      if (existingUser) {
        done(null, existingUser);
        //we already have a User with this id
      } else {
        new User ({googleId: profile.id})
        .save()
        .then(user => done(null, user));
        //create a new User with this id in the database
      }
    }) 
  }  
));