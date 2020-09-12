const Campground = require('../modules/campgroundsSchema');
const Comment = require('../modules/commentSchema')

const middlewares = {
	checkCampOwner: async function(req, res, next){
		try{
			if(req.isAuthenticated()){
				const data = await Campground.findById(req.params.id);
				if(data.author.id.equals(req.user._id)){
					next();
				} else{
					res.redirect('back')
				}
			} else{
				res.redirect('back')
			}	
		}
		catch (err){
			console.log(err)
		}
	},
	checkCommentOwner: async function(req, res, next){
		try{
			if(req.isAuthenticated()){
				const data = await Comment.findById(req.params.id);
				if(data.author.id.equals(req.user._id)){
					next();
				} else{
					res.redirect('back')
				}
			} else{
				res.redirect('back')
			}	
		}
		catch (err){
			console.log(err)
		}
	},
	checkAuth: async function(req, res, next){
		if(req.user){
			return next();
		} else{
			req.flash('error', 'You need to be logged-In')
			res.redirect('/login')
		}
	}
}

module.exports = middlewares;
