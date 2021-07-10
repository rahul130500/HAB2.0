const express = require("express");
const flash = require("connect-flash");
const hmcRoutes = require("./routes/hmc.routes");
const announcementsRoutes = require("./routes/announcements.routes");
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
const adminRoutes = require("./routes/admin.routes");
const app = express();
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");
const NoticeRoutes = require("./routes/notice-routes");
const MessRoutes = require("./routes/mess-routes");
const Personalweb = require("./routes/personalweb-routes");

const methodOverride = require("method-override");
require("dotenv").config();
const { MONGO_URL } = process.env;

//const NoticeAdd = require("./routes/noticeadd.routes");
// mongoose
//   .connect(MONGO_URL, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   })
//   .then(() => console.log("Successful DB connection"))
//   .catch((err) => console.error("DB connection fail"));
// mongoose.connect(keys.mongodb.dbURI,{ useUnifiedTopology: true },()=>{
//     console.log("connnected to mongodb");
// })

//harsh's mongodb
mongoose.connect("mongodb+srv://Harsh:harsh1234@cluster0.bkld1.mongodb.net/habhmc?retryWrites=true&w=majority", {useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false});

app.use(
  cookieSession({
    maxAgr: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey],
  })
);
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/admin/notice", NoticeRoutes);
app.use("/admin/mess", MessRoutes);
app.use("/admin/hmc", hmcRoutes);
app.use("/admin/announcements", announcementsRoutes);
app.use("/admin", adminRoutes);
app.use("/admin/personalweb",Personalweb);

app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

app.listen(5050, () => {
  console.log("app listening 5050");
});
