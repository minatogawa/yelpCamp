
const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../modules/userSchema')

// ######################################################################
// Authentications Routes
// ######################################################################

// ROUTE FOR PAGE'S REGISTER
router.get('/register', (req, res) =>{
	res.render('register')
})

// ROUTE FOR REGISTERING USER
router.post('/register', async(req, res) =>{
	try{
		const newUser = await User.register({username: req.body.username}, req.body.password)
		req.login(newUser, (err) =>{
			if(err){
				console.log(err)
			}else{
				req.flash('success', `Welcome! Nice to meet you ${newUser.username}`)
				res.redirect('/camps')			
			}
		})
	}
	catch(err){
		console.log(err)
		req.flash('error', err.message)
		res.redirect('/register');
	}	
})

// ROUTE FOR LOGIN PAGE
router.get('/login', (req, res) =>{
	// req.flash('successMessage', 'Successful Login')
	res.render('login')
})

// ROUTE FOR LOG USER IN
router.post('/login', passport.authenticate('local', 
	{
	successRedirect:'/camps', 
	failureRedirect:'/login',
	failureFlash:true,
	successFlash: 'Welcome to YelpCamp!'
	}
))

// ROUTE FOR LOG USER OUT
router.get('/logout', (req, res) =>{
	req.logout();
	req.flash('success', 'Logged Out')
	res.redirect('/login')
})

module.exports = router;
