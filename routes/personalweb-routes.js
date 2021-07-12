const express = require("express");
const router = express.Router();
const personalweb = require("../models/personalweb.models");
const { isAdmin, isLoggedIn } = require("../middlewares/adminauth");
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



router.get("/add",isLoggedIn,isAdmin,(req,res)=>{
    res.render("../views/admin/personalweb/add");
});

router.get("/",isLoggedIn,isAdmin,personalwebController.getWeb);


router.get("/:id",isLoggedIn,isAdmin,personalwebController.getEditWeb);

router.post('/:id',upload,isLoggedIn,isAdmin,(req,res) =>{
    const id = req.params.id;
    
    personalweb.findByIdAndUpdate(id, {
        name: req.body.name,
        link: req.body.link,
    },(err,result)=>{
        if(err){
            res.json({message: err.message});
        }else{
            res.redirect('/admin/personalweb');
        }
    })

})







module.exports = router;