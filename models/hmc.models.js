const mongoose = require("mongoose");

const detailsSchema = new mongoose.Schema({
    name : {
        type : String,
        required:[true]
    },
    post : {
        type : String,
        required:[true]
    },
    image : {
        type : String,
        required:[true]
    },
    contactNo : {
        type : Number,
        required:[true]
    },
    emailId : {
        type : String,
        required:[true]
    },
    roomNo : {
        type : Number,
        required:[true]
    },
    priorityNo : {
        type : Number,
        required:[true]
    },
});

const HMC_details = mongoose.model("HMC_detail",detailsSchema);

module.exports = HMC_details;