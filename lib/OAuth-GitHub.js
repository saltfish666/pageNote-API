const querystring = require('querystring');

const express = require('express');
const request = require('request');

let app = express();

let githubConfig = {

  client_ID: '40e9e869abab72c0da76',
  client_Secret: '157c110503ce7bc7c8d2b06deb64b4b1821fc422',

  access_token_url: 'https://github.com/login/oauth/access_token',

  user_info_url: 'https://api.github.com/user?',
  redirect_uri: 'https://saltfish666.github.io'
}

app.get("/",async function(req,res){

  let code = req.query.code
  let access_token = ''

  await request.post(githubConfig.access_token_url, {
    form:{
      "client_id": githubConfig.client_ID,
      "client_secret": githubConfig.client_Secret,
      "code": code,
    }
  },function(error, response, body) {
    if(error) return

    access_token = querystring.parse(body)["access_token"]

    res.redirect(302, githubConfig.redirect_uri + "?token="+access_token)
  })
})

app.listen(8072,function(){
  console.log('listening localhost:8099')
})
