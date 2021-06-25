const passport = require('passport');
const GoogleStrategy = require('passport-windowslive').Strategy;
const keys = require('./keys');
const User = require('../models/user-model');
const { isLoggedIn, isAdmin } = require("../middlewares/adminauth");

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        
        clientID: keys.outlook.clientID,
        clientSecret: keys.outlook.clientSecret,
        callbackURL: '/auth/windowslive/callback'
    }, (accessToken, refreshToken, profile, done) => {
       
        User.findOne({outlookId: profile.id}).then((currentUser) => {
            if(currentUser.isAdmin){
                // already have this user
                console.log('user is Admin: ', currentUser);
                done(null, currentUser);
            } else {
                // if not, create user in our db
                new User({
                    outlookId: profile.id,
                    username: profile.displayName
                }).save().then((newUser) => {
                    console.log('created new user not authenticated: ', newUser);
                    done(null, newUser);
                });
            }
        });
    })
);
