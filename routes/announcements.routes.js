const express = require("express");
const controllers = require("../controllers/announcements.controllers");

const router = express.Router();

router.get("/add", (req, res) => {
	res.render("../views/admin/announcements/add");
});
router.post("/add", controllers.addAnnouncements);

router.get("/", controllers.getAnnouncements);

router.get("/:id", controllers.editAnnouncements);
router.put("/:id", controllers.putAnnouncements);

router.delete("/:id", controllers.deleteAnnouncements);



module.exports = router;