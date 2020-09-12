// NPM required packages
const express = require('express'); 
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session')
const flash = require('connect-flash')

// Imported modules
const mongooseConnected = require('./modules/mongooseConnection.js'); //mongoose connection
const User = require('./modules/userSchema.js')
const seed = require('./seeds.js');

// Requiring routes
const campRoute = require('./routes/campgrounds')
const commentRoute = require('./routes/comments')
const authRoute = require('./routes/auth')

// Sets and middlewares
app.set('view engine', 'ejs') // view engine for ejs
mongoose.set('useFindAndModify', false);
app.use(express.urlencoded({ extended: true })) 
app.use(methodOverride('_method')) 
app.use(session({ 
	secret: 'keyboard cat',
	resave:false,
	saveUninitialized:false,
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
})
app.use(campRoute);
app.use(commentRoute);
app.use(authRoute);


// Passport configs
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Seeding the database
seed()

// ######################################################################################################

app.listen(3000, ()=>{
	console.log("RUNNING!")	
})














