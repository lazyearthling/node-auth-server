const Authentication = require('../controllers/authentication'),
      passport = require('passport');
      passportService = require('../services/passport'),
      express = require('express'),
      router = express.Router();

const RootRoute = require('./root-route');

const requireAuth = passport.authenticate('jwt',{session:false});
const requireLogin = passport.authenticate('local',{session:false});

router.route('/')
  .get(requireAuth,RootRoute.renderRoot);

router.route('/signup')
  .post(Authentication.signUp);

router.route('/signin')
  .post(requireLogin,Authentication.signIn);

module.exports = router;
