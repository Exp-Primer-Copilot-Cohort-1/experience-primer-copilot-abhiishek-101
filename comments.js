// Create a web server
// Load the express module
const express = require('express');
const app = express();
const path = require('path');
// Load the cookie-parser module
const cookieParser = require('cookie-parser');
// Load the body-parser module
const bodyParser = require('body-parser');
// Load the session module
const session = require('express-session');
// Load the express-handlebars module
const exphbs = require('express-handlebars');
// Load the express-validator module
const expressValidator = require('express-validator');
// Load the connect-flash module
const flash = require('connect-flash');
// Load the passport module
const passport = require('passport');
// Load the mongoose module
const mongoose = require('mongoose');
// Load the config file
const config = require('./config/database');
// Connect to the database
mongoose.connect(config.database);
// Check if the connection is successful
const db = mongoose.connection;
// Check for database errors
db.on('error', function(err) {
  console.log(err);
});
// Check if the database connection is open
db.once('open', function() {
  console.log('Connected to MongoDB');
});
// Load the route files
const routes = require('./routes/index');
const users = require('./routes/users');
// Set the port number
const port = 3000;
// Set the view engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');
// Set the body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// Set the cookie-parser middleware
app.use(cookieParser());
// Set the static folder
app.use(express.static(path.join(__dirname, 'public')));
// Set the express-session middleware
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));
// Set the passport middleware
app.use(passport.initialize());
app.use(passport.session());
// Set the express-validator middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.'),
    root = namespace.shift(),
    formParam = root;
    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg : msg,
      value: value
    };
  }
}));