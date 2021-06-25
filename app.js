const express = require('express');
const authRoutes= require('./routes/auth-routes');
const profileRoutes = require("./routes/profile-routes");
const app = express();
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const NoticeRoutes = require("./routes/notice-routes");
//const NoticeAdd = require("./routes/noticeadd.routes");
mongoose.connect(keys.mongodb.dbURI,()=>{
    console.log("connnected to mongodb");
})

app.use(cookieSession({
    maxAgr:24*60*60*1000,
    keys:[keys.session.cookieKey]
}));


app.use(passport.initialize());
app.use(passport.session());

app.set('view engine','ejs');

app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);
app.use('/admin/notice',NoticeRoutes);




app.get('/',(req,res)=>{
   res.render('home',{user:req.user});
});

app.listen(5050, ()=>{
    console.log('app listening 5050');
});

