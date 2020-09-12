const mongoose = require('mongoose');
const Comment = require('./commentSchema.js')

const campSchema = new mongoose.Schema({
	title: String,
	image: String,
	post: String,
	author: {
		id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
		username:String,
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment'
		}
	]
})

const Campground = mongoose.model('Campground', campSchema);

module.exports = Campground;