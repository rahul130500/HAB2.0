const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});


router.get('/windowslive', passport.authenticate('windowslive', {
    scope: ['wl.signin']
}));

router.get('/windowslive/callback', passport.authenticate('windowslive'), (req, res) => {
   
    res.redirect('/profile');
});

module.exports = router;
