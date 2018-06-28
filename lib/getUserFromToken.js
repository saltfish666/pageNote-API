const User = require('./models/User')
const promisify = require('util').promisify

const find = promisify(User.find)

module.exports = async (token) => {
	let where = { 'token':token }
	try{
		let res = await find(where)
		console.log(res)
		return res[0]
	}catch(err){
		console.log(err)
		return null
	}
}
/*
TypeError: Cannot read property 'Query' of undefined
    at find (/Users/apple/Desktop/666git/pageNote-node/node_modules/mongoose/lib/model.js:1399:21)
    at find (internal/util.js:227:26)
    at module.exports (/Users/apple/Desktop/666git/pageNote-node/lib/getUserFromToken.js:9:19)
    at __dirname (/Users/apple/Desktop/666git/pageNote-node/lib/test.js:4:22)
    at Object.<anonymous> (/Users/apple/Desktop/666git/pageNote-node/lib/test.js:6:3)
    at Module._compile (module.js:624:30)
    at Object.Module._extensions..js (module.js:635:10)
    at Module.load (module.js:545:32)
    at tryModuleLoad (module.js:508:12)
    at Function.Module._load (module.js:500:3)
    at Function.Module.runMain (module.js:665:10)
    at startup (bootstrap_node.js:187:16)
    at bootstrap_node.js:608:3
*/