const Authentication = require('../controllers/authentication');
const RootRoute = require('./root-route');

module.exports = function(app){
  app.get('/',RootRoute.renderRoot);
  app.post('/signup',Authentication.signUp);
}
