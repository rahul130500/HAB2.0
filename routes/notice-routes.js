const router = require('express').Router();
const {isLoggedIn, isAdmin} = require("../middlewares/adminauth");



router.get('/', isLoggedIn,(req, res) => {
    res.render('admin/notice/index');
    
});




module.exports = router;