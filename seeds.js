const mongoose = require('mongoose');
const Campground = require('./modules/campgroundsSchema.js');
const Comment = require('./modules/commentSchema.js');


data = [
	{
		title: "Camp 1",
		image: `https://images.pexels.com/photos/1723722/pexels-photo-1723722.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`,
		post: "some Description 1",
		comments: []
	},
		{
		title: "Camp 2",
		image: `https://images.pexels.com/photos/587976/pexels-photo-587976.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`,
		post: "some Description 2",
		comments: []
	},
		{
		title: "Camp 3",
		image: `https://images.pexels.com/photos/1752951/pexels-photo-1752951.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`,
		post: "some Description 3",
		comments: []
	},
]

const seedDB = async() =>{
	try{
		await Campground.deleteMany({});
		console.log('REMOVED CAMPGROUNDS')
		await Comment.deleteMany({});
		console.log('REMOVED COMMENTS');
		for(item of data){
			// console.log(item)
			const campground = await Campground.create(item)
			console.log('CAMPGROUND CREATED');
			// const test = await Comment.create({author:"fulano", commentary:"Vamo que vamo"});
			// console.log('COMMENT CREATED');
			// campground.comments.push(test);
			// campground.save()
			// console.log(campground)
		}
	}
	catch(err){
		console.log(err)
	}
}

module.exports = seedDB;











