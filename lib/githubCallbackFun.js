let githubConfig = {

  client_ID: '40e9e869abab72c0da76',
  client_Secret: '157c110503ce7bc7c8d2b06deb64b4b1821fc422',

  access_token_url: 'https://github.com/login/oauth/access_token',

  user_info_url: 'https://api.github.com/user?',
  redirect_uri: 'https://saltfish666.github.io'
}

module.exports = async (req,res) => {
	let code = req.query.code

	//向github获取token

	//向github获取 user

	//查询user是否存在

	//如果存在，刷新token

	//如果不存在，创建用户

	//向用户返回能设置token 跳转界面的脚本
}