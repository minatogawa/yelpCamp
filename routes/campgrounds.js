
const express = require('express');
const router = express.Router();
const Campground = require('../modules/campgroundsSchema.js');
const middlewares = require('../middlewares')

// ============================================================================
// Campground Routes
// ============================================================================

router.get('/', (req, res) =>{
	res.send("Hello World");
})

// ROUTE FOR CAMPGROUND'S PAGE
router.get('/camps', async (req, res) =>{
	try{
		const data = await Campground.find({});
		res.render('campgrounds/index', {data: data})
	} 
	catch (err){
		console.log(err);
	}
})

// ROUTE FOR CREATING NEW CAMPGROUND'S PAGE
router.get('/camps/new', middlewares.checkAuth, (req, res) =>{
	res.render('campgrounds/new');
})

// ROUTE FOR CREATE NEW COMMENT
router.post('/camps', (req, res) =>{
	Campground.create({
		author: {id:req.user.id, username:req.user.username},
		title: req.body.title,
		image: req.body.image,
		post: req.body.post,
	})
	res.redirect('/camps')
})

// ROUTE FOR SHOW PAGE
router.get('/camps/:id', async(req, res) =>{
	try{
		const data = await Campground.findById(req.params.id).populate("comments");
		res.render('campgrounds/show', {data:data});
	}
	catch(err){
		console.log(err);
	}	
})

// ROUTE FOR EDIT CAMPGROUND PAGE
router.get('/camps/:id/edit', middlewares.checkCampOwner, async(req, res) =>{
	try{
		const data = await Campground.findById(req.params.id);
		res.render('campgrounds/edit', {data:data})	
	}
	catch (err){
		console.log(err)
	}
})

// ROUTE FOR EDITING CAMPGROUND
router.put('/camps/:id', middlewares.checkCampOwner, async(req, res) =>{
	try{
	const data = await Campground.findByIdAndUpdate({_id:req.params.id}, 
	   {title: req.body.title,
		image:req.body.image,
		post:req.body.post,
	   })
		res.redirect(`/camps/${req.params.id}`);
	}
	catch(err){
		console.log(err);
	}
})

// ROUTE FOR DELETING CAMPGROUND
router.delete('/camps/:id', middlewares.checkCampOwner, async(req, res) =>{
	try{
		const data = await Campground.findByIdAndDelete(req.params.id);
		res.redirect('/camps');
	}
	catch(err){
		console.log(err)
	}
})

// async function checkOwner(req, res, next){
// 	try{
// 		if(req.isAuthenticated()){
// 			const data = await Campground.findById(req.params.id);
// 			if(data.author.id.equals(req.user._id)){
// 				next();
// 			} else{
// 				res.redirect('back')
// 			}
// 		} else{
// 			res.redirect('back')
// 		}	
// 	}
// 	catch (err){
// 		console.log(err)
// 	}
// }
		
// // MIDDLEWARE FOR CHECKING AUTHENTICATION
// function checkAuth(req, res, next){
// 	if(req.user){
// 		return next();
// 	} else{
// 		res.redirect('/login')
// 	}
// }

module.exports = router;
