const router = require('express').Router();
const { isAdmin, isLoggedIn } = require("../middlewares/adminauth");


router.get('/', isLoggedIn, (req, res) => {
    res.render('admin', { user: req.user });
});

module.exports = router;