
const express = require('express');
const router = express.Router();
const Campground = require('../modules/campgroundsSchema');
const Comment = require('../modules/commentSchema');
const middlewares = require('../middlewares')

// ============================================================================
// Comments Routes
// ============================================================================

// ROUTE FOR CREATING COMMENT'S PAGE
router.get('/camps/:id/comments/new', middlewares.checkAuth, async(req, res) =>{
	try{
		const data = await Campground.findById(req.params.id)
		res.render('comments/new', {data:data})
	}
	catch(err){
		console.log(err)
	}
})

// ROUTE FOR COMMENT CREATION
router.post('/camps/:id/comments', middlewares.checkAuth, async (req, res) =>{
	try{
		const campground = await Campground.findById(req.params.id);
		console.log(req.user._id)
		const comment = await Comment.create(
			{
			author:{id:req.user._id, username: req.user.username},
			commentary: req.body.commentary
			}
		);
		await campground.comments.push(comment);
		campground.save();
		res.redirect(`/camps/${req.params.id}`)
	}
	catch(err){
		console.log(err)
	}
})

// ROUTE FOR EDIT COMMENTS PAGE
router.get('/camps/comments/:id/edit', async (req, res) =>{
	try{
		if(req.isAuthenticated){
			const data = await Comment.findById(req.params.id)
			console.log(data.author.id)
			console.log(req.user._id)
			if(data.author.id.equals(req.user._id)){
				res.render('comments/edit', {data:data});	
			} else{
			res.redirect('back')
			}
		} else{
			res.redirect('/camps')
		}		
	}
	catch(err){
		console.log(err);
	}
})

// ROUTE FOR UPDATING A COMMENT
router.put('/camps/comments/:id/edit', middlewares.checkCommentOwner, async(req, res) =>{
	try{
		const data = await Comment.findByIdAndUpdate(req.params.id, {commentary: req.body.commentary})
		res.redirect('/camps') //need to fix the route, to be able to redirect to the show page
	}
	catch(err){
		console.log(err)
	}
})

// ROUTE FOR DELETING A COMMENT
router.delete('/camps/comments/:id/delete', middlewares.checkCommentOwner, async(req, res) =>{
	await Comment.findByIdAndDelete(req.params.id);
	res.redirect('back')
})

// async function checkOwner(req, res, next){
// 	if(req.isAuthenticated){
// 		const data = await Comment.findById(req.params.id)
// 		if(data.author.id.equals(req.user._id)){
// 			next();
// 		} else{
// 			res.redirect('/camps')
// 		}
// 	} else{
// 		res.redirect('/camps')
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
