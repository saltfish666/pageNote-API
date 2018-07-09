const express = require('express')
const router = express.Router()

const Note = require('../models/Note')

router.post('/', (req, res) => {
  let user = req.user

  let where = {
    id: user.oauth + user.name,
    domain: req.query.domain,
    path: req.query.path
  }
  Note.find(where, (err, result) => {
    if (err) return res.status(500).res.send(err.message)

    if (result.length === 0) {
      let note = new Note({
        id: user.oauth + user.name,
        domain: req.query.domain,
        path: req.query.path,
        content: req.query.content
      })
      note.save((err, result) => {
        if (err) return res.status(500).res.send(err.message)

        res.json({status: '200 ok'})
      })
    }

    if (result.length > 0) {
      let noteNewFeild = {
        content: req.query.content
      }
      Note.update(where, noteNewFeild, (err, result) => {
        if (err) return res.status(500).res.send(err.message)

        res.json({status: '200 ok'})
      })
    }
  })
})

router.get('/', (req, res) => {
  let user = req.user
  let where = {}
  where.id = user.id

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
