const mongoose = require('./connect.js')
const Schema = mongoose.Schema

let userSchema = new Schema({
	id: String,
	oauth: String,
	name: String,
	email: String,
	access_token: String,
	token: String
})

module.exports = mongoose.model('User', userSchema,'users')