const express = require('express')
const router = express.Router()

const Note = require('../models/Note')

router.use((req, res) => {
  let user = req.user
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

module.exports = router
