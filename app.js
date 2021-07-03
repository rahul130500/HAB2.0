const express = require('express');
const flash = require("connect-flash");
const hmcRoutes = require("./routes/hmc.routes");
const authRoutes= require('./routes/auth-routes');
const profileRoutes = require("./routes/profile-routes");
const adminRoutes = require("./routes/admin.routes");
const app = express();
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const NoticeRoutes = require("./routes/notice-routes");
const MessRoutes = require("./routes/mess-routes");

const methodOverride = require("method-override");

mongoose.connect(keys.mongodb.dbURI,{ useUnifiedTopology: true },()=>{
    console.log("connnected to mongodb");
})

app.use(cookieSession({
    maxAgr:24*60*60*1000,
    keys:[keys.session.cookieKey]
}));
app.use(flash());
app.use(hmcRoutes);

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine','ejs');
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);
app.use('/admin/notice',NoticeRoutes);
app.use('/admin/mess',MessRoutes);
app.use('/admin',adminRoutes);




app.get('/',(req,res)=>{
   res.render('home',{user:req.user});
});

app.listen(5050, ()=>{
    console.log('app listening 5050');
});

