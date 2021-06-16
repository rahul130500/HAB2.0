//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use("/public", express.static("public"));

//home page
app.get("/", (req, res) => {
  res.render("admin/notice/index");
});

app.listen(3000, function () {
  console.log("server running successfully on port 3000");
});
