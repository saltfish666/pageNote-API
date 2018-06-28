const User = require('./models/User')

let githubConfig = {

  client_ID: '40e9e869abab72c0da76',
  client_Secret: '157c110503ce7bc7c8d2b06deb64b4b1821fc422',

  access_token_url: 'https://github.com/login/oauth/access_token',

  user_info_url: 'https://api.github.com/user?',
  redirect_uri: 'http://libai688.com:8072/'
}

module.exports = async (req,res) => {
	let code = req.query.code

	let access_token = ''
	await request.post(githubConfig.access_token_url, {
	    form:{
	      "client_id": githubConfig.client_ID,
	      "client_secret": githubConfig.client_Secret,
	      "code": code 
	    }
	  },function(err, response, body) {
	    if(err) return res.json({ status:'err', msg:err.message })

	    access_token = querystring.parse(body)["access_token"]
	  })

	let user = {}
	await request.get(githubConfig.user_info_url,{
		headers:{
			Authorization: 'bearer ' + access_token
		}
	}, (err, res, body) => {
		if(err) return res.json({ status:'err', msg:err.message })

		user = JSON.parse(body)
	})

    let token = access_token.split('').reverse().join('')
	await User.find({'id': 'github' + user.login}, (err,doc) => {
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
	    }

	    User.update({ id: 'github' + user.login },{
						token: token,
						access_token: access_token
					},(err, res)=>{})
    })

    res.redirect(302, githubConfig.redirect_uri + "?token="+token)
}