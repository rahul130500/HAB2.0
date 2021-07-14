const About = require("../models/about.models");

module.exports.getAboutDetails = async (req, res) => {
    try {
        const aboutdetails = await About.find({}).sort({_id:-1}).limit(1);
        return res.render("../views/admin/about/index", { aboutdetails });
    } catch (err) {
        console.error(err);
        return res.json({ message: err.message, type: "database connection error" });
    }
};

module.exports.addAboutDetails = async (req, res) => {
	try {
		await About.create(req.body);
		return res.redirect("/admin/about");
	} catch (err) {
		console.error(err.message);
		return res.json({ message: err.message, type: "database connection error" });
	}
};

module.exports.editAboutDetails = async (req, res) => {
    try {
        const id = req.params.id;
		const aboutdetails = await About.findById(id);
		return res.render("../views/admin/announcements/edit", { aboutdetails });
	} catch (err) {
        console.error(err);
		return res.json({ message: err.message, type: "database connection error" });
	}
};

module.exports.putAboutDetails = async (req, res) => {
    try {
        const id = req.params.id;
		await About.findByIdAndUpdate(id, req.body);
		return res.redirect("/admin/about");
	} catch (err) {
        console.error(err);
		return res.json({ message: err.message, type: "database connection error" });
	}
};