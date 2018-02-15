const express    = require('express'),
      http       = require('http'),
      bodyParser = require('body-parser'),
      morgan     = require('morgan'),
      app        = express();

//APP SETUP
app.use(morgan('combined'));
app.use(bodyParser.json({type:'*/*'}));
app.use(bodyParser.urlencoded({extended:true}));

//SERVER SETUP
const PORT = 3000;
const server = http.createServer(app);
server.listen(PORT,function(){
  console.log(`Server listening on port ${PORT}`);
})
