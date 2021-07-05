const express = require("express");
const router = express.Router();
const hmcDetail = require("../models/hmc.models");
const multer = require('multer');
const fs = require('fs');

//image upload 
var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads/details_img');
    },
    filename: function(req,file,cb){
        cb(null,file.fieldname+"_"+Date.now()+"_"+file.originalname);
    },
});
var upload = multer({
    storage: storage,
}).single("image");

//Insert an user to database
router.post('/add',upload,(req,res)=>{
    const detail = new hmcDetail({
        name: req.body.name,
        post: req.body.post,
        image: req.file.filename,
        contno: req.body.contno,
        roomno: req.body.roomno,
        email : req.body.email,
        priono : req.body.priono


    });
    detail.save((err)=>{
        if(err){
            res.json({message: err.message, type: 'danger'})
        }else{
            res.redirect("/admin/hmc");
        }
    })

    
        
});

router.get("/",(req,res)=>{
    // res.render("../views/admin/hmc/index");
    hmcDetail.find().exec((err,hmcdetails)=>{
        if(err){
            res.json({message: err.message});
        }else{
            res.render("../views/admin/hmc/index",{
                hmcdetails: hmcdetails,
            })
        }
    })
})

router.get("/add",(req,res)=>{
    res.render("../views/admin/hmc/add");
})


router.get('/:id', (req,res) =>{
    const id = req.params.id;
    hmcDetail.findById(id ,(err,detail)=>{
        if(err){
            res.redirect('/');
        }else{
            if(detail == null){
                res.redirect('/');
            }
            else{
                res.render('../views/admin/hmc/edit',{
                    detail: detail,
                })
            }
        }
    })
});

router.post('/:id',upload,(req,res) =>{
    const id = req.params.id;
    let new_image = '';

    if(req.file){
        new_image = req.file.filename;
        try {
            fs.unlinkSync('./uploads/details_img'+req.body.old_image);
        }catch(err){
            console.log(err);
        }
    }else{
        new_image = req.body.old_image;
    }
    hmcDetail.findByIdAndUpdate(id, {
        name: req.body.name,
        post: req.body.post,
        image: new_image,
        contno: req.body.contno,
        roomno: req.body.roomno,
        email : req.body.email,
        priono : req.body.priono
    },(err,result)=>{
        if(err){
            res.json({message: err.message});
        }else{
            res.redirect('/admin/hmc');
        }
    })

})


router.get('/delete/:id',(req,res)=>{
    const id = req.params.id;
    hmcDetail.findByIdAndRemove(id, (err,result)=>{
        if(result.image != ''){
            try{
                fs.unlinkSync('./uploads/details_img/'+result.image);
            }catch(err){
                console.log(err);
            }
        }
        if(err){
            res.json({message: err.message});
        }else{
            res.redirect('/admin/hmc');
        }

    })
})







module.exports = router;