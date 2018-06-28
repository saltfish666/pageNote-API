const fs = require('fs')
const express = require('express')

let app = express()

app.get('/',async (req, res) => {
	let data = null
	await fs.readFile('./README.md', 'utf8', (err, _data) => {
		if(err) return console.log(err)
		console.log(_data)
        data = _data
	})
	console.log(data)
	res.send(data)
})

app.listen(9999)