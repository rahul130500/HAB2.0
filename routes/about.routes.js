const express = require("express");
const controllers = require("../controllers/about.controllers");

const router = express.Router();

router.get("/add", (req, res) => {
	res.render("../views/admin/about/add");
});
router.post("/add", controllers.addAboutDetails);

router.get("/", controllers.getAboutDetails);

router.get("/:id", controllers.editAboutDetails);
router.put("/:id", controllers.putAboutDetails);





module.exports = router;