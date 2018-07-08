const express = require('express')
const router = express.Router()

const User = require('../models/User')

router.use((req, res, next) => {
  let token = null

  try { token = req.headers.authorization.split(' ')[1] } catch (e) { return res.status(401).send('no token') }

  User.find({token: token}, (err, doc) => {
    if (err) return res.status(500).res.send(err.message)

    if (!doc.length) return res.status(401).send('token doesnot match user')

    doc[0]['_id'] = null
    doc[0]['__v'] = null

    req.user = doc[0]
    next()
  })
})

module.exports = router
