const express = require('express')
const router = express.Router()

const User = require('../models/User')
const Note = require('../models/Note')

router.use((req, res) => {
  let token = null

  try { token = req.headers.authorization.split(' ')[1] } catch (e) { return res.status(401).send('no token') }

  User.find({'token': token}, (err, doc) => {
    if (err) return res.status(500).res.send(err.message)

    if (!doc.length) return res.status(401).send('token doesnot match user')

    let user = doc[0]
    let where = {}
    where.id = user.oauth + user.name
    if (req.query.domain) where.domain = req.query.domain
    if (req.query.path) where.path = req.query.path

    Note.find(where, (err, doc) => {
      if (err) return res.status(500).res.send(err.message)

      for (let item of doc) {
        item['_id'] = null
        item['__v'] = null
      }
      res.json(doc)
    })
  })
})

module.exports = router
