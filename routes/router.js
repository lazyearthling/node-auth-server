const Authentication = require('../controllers/authentication'),
      passport = require('passport');
      passportService = require('../services/passport');

const RootRoute = require('./root-route');

const requireAuth = passport.authenticate('jwt',{session:false});
const requireLogin = passport.authenticate('local',{session:false});

module.exports = function(app){
  app.get('/',requireAuth,RootRoute.renderRoot);
  app.post('/signup',Authentication.signUp);
  app.post('/signin',requireLogin,Authentication.signIn);
}
