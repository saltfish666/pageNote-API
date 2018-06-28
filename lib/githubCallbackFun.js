const request = require('request')
const querystring = require('querystring')

const User = require('./models/User')

let githubConfig = {

  client_ID: '40e9e869abab72c0da76',
  client_Secret: '157c110503ce7bc7c8d2b06deb64b4b1821fc422',

  access_token_url: 'https://github.com/login/oauth/access_token',

  user_info_url: 'https://api.github.com/user?',
  redirect_uri: 'https://github.com/saltfish666/pageNote-node'
}

module.exports = (req,res) => {
	let code = req.query.code

    request.post(githubConfig.access_token_url, {
	    form:{
	      "client_id": githubConfig.client_ID,
	      "client_secret": githubConfig.client_Secret,
	      "code": code 
	    },
	    headers: {
	    	"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36"
	    }
	  },function(err, response, body) {
	    if(err) return res.json({ status:'err', msg:err.message })
        
        console.log(body)
	    let access_token = querystring.parse(body)["access_token"]
		request.get(githubConfig.user_info_url,{
			headers:{
				Authorization: 'bearer ' + access_token,
				"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36"
			}
			}, (err, result, body) => {
				if(err) return res.json({ status:'err', msg:err.message })

				let user = JSON.parse(body)
			    let token = access_token.split('').reverse().join('')
			    User.find({'id': 'github' + user.login}, (err,doc) => {
				    if(err) return res.json({status: 'err',msg: err.message})
				    
				    if(!doc.length){
				    	let newUser = new User({
				    		id: 'github' + user.login,
				    		name: user.login,
				    		email: user.email,
				    		access_token: access_token,
				    		token: token
				    	})
				    	newUser.save((err,res)=>{})
				    }else{
					    User.update({ 
					    	id: 'github' + user.login 
					    },{
							token: token,
							access_token: access_token
						},(err, res)=>{})
					}
					res.redirect(302, githubConfig.redirect_uri + "?token="+token)
			    })
			})
	  })
}