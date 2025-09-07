const express = require('express');
const passport = require('passport');
const { register, login, authGoogle, authFacebook } = require('../controllers/authController');
const router = express.Router();

require('../config/passport');

router.post('/register', register);
router.post('/login', login);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), authGoogle);

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), authFacebook);

module.exports = router;
