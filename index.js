const express = require ('express');
const mongoose = require ('mongoose');
const cookieSession = require ('cookie-session');
const passport = require ('passport');
const keys = require ('./config/keys')
require ('./models/users');
require ('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  }));

app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 5000;

require ('./routes/authRoutes')(app);

app.listen(PORT);

//clientId
//592773926050-oom76o9ph52svt9eohgb94kt4c6iq2a3.apps.googleusercontent.com
//client secret
//1RP5FfWxbrItIjKx-8jcJW1e

//mongoDB password kwrAfYLykI23XdHj