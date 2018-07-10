const express = require('express')
const router = express.Router()

const request = require('request')
const querystring = require('querystring')

const User = require('../models/User')

let githubConfig = require('../conf.js').githubCallback

router.use((req, res) => {
  let code = req.query.code

  request.post(githubConfig.access_token_url, {
    form: {
      'client_id': githubConfig.client_ID,
      'client_secret': githubConfig.client_Secret,
      'code': code
    },
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36'
    }
  }, function (err, response, body) {
    if (err) return res.json({ status: 'err', msg: err.message })

    /* eslint camelcase: "off" */
    let access_token = querystring.parse(body)['access_token']
    request.get(githubConfig.user_info_url, {
      headers: {
        Authorization: 'bearer ' + access_token,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36'
      }
    }, (err, result, body) => {
      if (err) return res.json({ status: 'err', msg: err.message })

      let user = JSON.parse(body)
      let token = access_token.split('').reverse().join('')
      User.find({'id': 'github' + user.login}, (err, doc) => {
        if (err) return res.json({status: 'err', msg: err.message})

        if (!doc.length) {
          let newUser = new User({
            oauth: 'github',
            id: 'github' + user.login,
            name: user.login,
            email: user.email,
            ccess_token: access_token,
            token: token
          })
          newUser.save((err, res) => {
            if (err) return res.json({ status: 'err', msg: err.message })
          })
        } else {
          User.update({
            id: 'github' + user.login
          }, {
            token: token,
            access_token: access_token
          }, (err, res) => {
            if (err) return res.json({ status: 'err', msg: err.message })
          })
        }
        res.redirect(302, githubConfig.redirect_uri + '?token=' + token)
      })
    })
  })
})

module.exports = router
