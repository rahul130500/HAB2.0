const express = require("express");
const controllers = require("../controllers/about.controllers");
const { isAdmin, isLoggedIn } = require("../middlewares/adminauth");

const router = express.Router();

router.get("/add", isLoggedIn,isAdmin, (req, res) => {
	res.render("../views/admin/about/add");
});
router.post("/add", isLoggedIn,isAdmin, controllers.addAboutDetails);

router.get("/", isLoggedIn,isAdmin, controllers.getAboutDetails);

router.get("/:id", isLoggedIn,isAdmin, controllers.editAboutDetails);
router.put("/:id", isLoggedIn,isAdmin, controllers.putAboutDetails);





module.exports = router;