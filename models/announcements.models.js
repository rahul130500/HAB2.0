const mongoose = require("mongoose");

const detailsSchema = new mongoose.Schema({
	title: { type: String, required: true },
	link: { type: String, required: true },
	category: { type: String, required: true },
	creation: { type: Date, default: Date.now },
});

module.exports = mongoose.model("announcementsDetail", detailsSchema);
