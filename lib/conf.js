module.exports = {
  githubCallback: {
    client_ID: '40e9e869abab72c0da76',
    client_Secret: '157c110503ce7bc7c8d2b06deb64b4b1821fc422',

    access_token_url: 'https://github.com/login/oauth/access_token',

    user_info_url: 'https://api.github.com/user?',
    redirect_uri: 'https://pagenote.xyz/'
  },
  // mongoURL: require('./private.conf.js').mongoURL
  mongoURL: process.env['mongoURL']
}

// you should set env before run this app
// ./private.conf.js is my private config which is in .gitignore
// mongoURL looks like  mongodb://user:password@178.128.0.181:27017/PageNote
