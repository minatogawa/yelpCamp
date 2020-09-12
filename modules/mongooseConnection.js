const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/yelpCamp2', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () =>{
  console.log('Mongoose Running!')
});

module.exports = db;
