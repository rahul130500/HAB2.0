const express = require("express");
const router = express.Router();
const personalweb = require("../models/personalweb.models");
const fs = require('fs');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads/details_img');
    },
    filename: function(req,file,cb){
        cb(null,file.fieldname+"_"+Date.now()+"_"+file.originalname);
    },
});
const upload = multer({
    storage: storage,
}).single("image");
const personalwebController = require("../controllers/personalweb.controllers");



router.get("/add",(req,res)=>{
    res.render("../views/admin/personalweb/add");
});

router.get("/",personalwebController.getWeb);



router.post('/add',upload,(req,res)=>{
    const web = new personalweb({
        name: req.body.name,
        link: req.body.link


    });
    web.save((err)=>{
        if(err){
            res.json({message: err.message, type: 'danger'})
        }else{
            res.redirect("/admin/personalweb");
        }
    })

    
        
});







module.exports = router;