const mongoose = require('./connect.js')
const Schema = mongoose.Schema

let NoteSchema = new Schema({
	id: String,
	domain: String,
	path: String,
	content: String
})

module.exports = mongoose.model('Note', NoteSchema,'notes')