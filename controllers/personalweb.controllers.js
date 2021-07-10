const personalweb = require("../models/personalweb.models");
const fs = require('fs');


exports.getWeb = async (req,res)=>{
    
    personalweb.find().exec((err,personalwebs)=>{
        if(err){
            res.json({message: err.message});
        }else{
            res.render("../views/admin/personalweb/index",{
                personalwebs: personalwebs,
            })
        }
    })
};


