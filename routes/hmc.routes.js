const express = require("express");
const HMC_details = require("../models/hmc.models")

const router = express.Router();

router.post("/xyz",(req,res) => {
    const hmc = new HMC_details(req.body);

    hmc.save()
        .then( r => {
            console.log("saved successfully")
            res.redirect("/xyz");
        })
        .catch( err => {
            console.error(err);
        })
})

module.exports = router;