const Announcement = require("../models/announcements.models");

module.exports.get_announcements = async (req, res) => {
    try {
        const announcementsList = await Announcement.find();
        return res.render("../views/admin/announcements/index", { announcementsList });
    } catch (err) {
        console.error(err);
        return res.json({ message: err.message, type: "database connection error" });
    }
};

module.exports.post_addAnnouncement = async (req, res) => {
	try {
		await Announcement.create(req.body);
		return res.redirect("/admin/announcements");
	} catch (err) {
		console.error(err.message);
		return res.json({ message: err.message, type: "database connection error" });
	}
};

module.exports.get_editAnnouncements = async (req, res) => {
    try {
        const id = req.params.id;
		const announcement = await Announcement.findById(id);
		return res.render("../views/admin/announcements/edit", { announcement });
	} catch (err) {
        console.error(err);
		return res.json({ message: err.message, type: "database connection error" });
	}
};

module.exports.post_editAnnouncements = async (req, res) => {
    try {
        const id = req.params.id;
		await Announcement.findByIdAndUpdate(id, req.body);
		return res.redirect("/admin/announcements");
	} catch (err) {
        console.error(err);
		return res.json({ message: err.message, type: "database connection error" });
	}
};

module.exports.get_deleteAnnouncements = async (req, res) => {
    try {
        const id = req.params.id;
        await Announcement.findByIdAndRemove(id);
        req.flash("success", "Successfully deleted notice");
        return res.redirect("/admin/announcements");
    } catch (err) {
        return res.json({ message: err.message, type: "database connection error" });
    }
};