const express = require("express");
const announcementsControllers = require("../controllers/announcements.controllers");

const router = express.Router();

router.get("/add", (req, res) => {
	res.render("../views/admin/announcements/add");
});
router.post("/add", announcementsControllers.post_addAnnouncement);
router.post("/:id", announcementsControllers.post_editAnnouncements);

router.get("/", announcementsControllers.get_announcements);
router.get("/:id", announcementsControllers.get_editAnnouncements);
router.get("/delete/:id", announcementsControllers.get_deleteAnnouncements);



module.exports = router;