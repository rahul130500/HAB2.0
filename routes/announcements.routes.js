const express = require("express");
const router = express.Router();
const announcementsDetail = require("../models/announcements.models");

router.post("/add", (req, res) => {
	const detail = new announcementsDetail({
		title: req.body.title,
		link: req.body.link,
		category: req.body.category,
	});
	detail.save((err) => {
		if (err) {
			res.json({ message: err.message, type: "cant connect to database" });
		} else {
			res.redirect("/admin/announcements");
		}
	});
});

router.get("/", (req, res) => {
	announcementsDetail.find().exec((err, announcementsdetails) => {
		if (err) {
			res.json({ message: err.message });
		} else {
			res.render("../views/admin/announcements/index", {
				announcementsdetails: announcementsdetails,
			});
		}
	});
});

router.get("/add", (req, res) => {
	res.render("../views/admin/announcements/add");
});

router.get("/:id", (req, res) => {
	const id = req.params.id;
	announcementsDetail.findById(id, (err, detail) => {
		if (err) {
			res.redirect("/");
		} else {
			if (detail == null) {
				res.redirect("/");
			} else {
				res.render("../views/admin/announcements/edit", {
					detail: detail,
				});
			}
		}
	});
});

router.post("/:id", (req, res) => {
	const id = req.params.id;
	announcementsDetail.findByIdAndUpdate(
		id,
		{
			title: req.body.title,
			link: req.body.link,
			category: req.body.category,
		},
		(err, result) => {
			if (err) {
				res.json({ message: err.message });
			} else {
				res.redirect("/admin/announcements");
			}
		}
	);
});

router.get("/delete/:id", (req, res) => {
	const id = req.params.id;
	announcementsDetail.findByIdAndRemove(id, (err, result) => {
		if (err) {
			res.json({ message: err.message });
		} else {
			res.redirect("/admin/announcements");
		}
	});
});

module.exports = router;
