var router = require('express').Router();
var passport = require('passport');
require('../config/passportConfig')(passport);
var functions = require('../middleware/functions');
var ensureAuthenticated = functions.ensureAuthenticated;
var ensureNotLoggedIn = functions.ensureNotLoggedIn;
var issueToken = functions.issueToken;

router.get('/', /*ensureAuthenticated, */function (req, res) {
  res.render('index', { text: "This is CMS" });
});
router.get('/login',/* ensureNotLoggedIn,*/ function (req, res) {
  res.render('login', { text: "This is CMS - login" });
});
router.post('/login',
  passport.authenticate('local', { failureRedirect: './login', failureFlash: true }),
  function (req, res, next) {
    // Issue a remember me cookie if the option was checked
    if (!req.body.remember_me) { return next(); }

    issueToken(req.user, function (err, token) {
      if (err) { return next(err); }
      res.cookie('remember_me', token, { path: './', httpOnly: true, maxAge: 604800000 });
      return next();
    });
  },
  function (req, res) {
    res.redirect('./');
  });

router.get('/logout', function (req, res) {
  res.clearCookie('remember_me');
  req.logout();
  res.redirect('/');
});

router.use('/posts', require('./modules/post/postRoute'));
router.use('/categories', require('./modules/category/categoryRoute'));
router.use('/pages', require('./modules/page/pageRoute'));
router.use('/fileManager', require('./modules/fileManager/fileManagerRoute'));
router.use('/galleries', require('./modules/gallery/galleryRoute'));

module.exports = router;