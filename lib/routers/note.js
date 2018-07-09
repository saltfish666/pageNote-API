const express = require('express')
const router = express.Router()

const Note = require('../models/Note')

router.get('/', (req, res) => {
  let user = req.user
  let where = {}
  where.id = user.id

  if (req.query.domain) where.domain = req.query.domain
  if (req.query.path) where.path = req.query.path

  Note.find(where, (err, doc) => {
    if (err) return res.status(500).send(err.message)

    for (let item of doc) {
      item['_id'] = null
      item['__v'] = null
    }
    res.json(doc)
  })
})

router.delete('/', (req, res) => {
  let user = req.user
  let where = {}
  where.id = user.id

  if (req.query.domain) where.domain = req.query.domain
  if (req.query.path) where.path = req.query.path

  Note.deleteOne(where, (err, doc) => {
    if (err) return res.status(500).send(err.message)

    res.send('success to delete')
  })
})

router.post('/', postPacthHandler)
router.patch('/', postPacthHandler)

function postPacthHandler (req, res) {
  let user = req.user

  if (!req.query.domain) return res.status(403).send('param domain is required')
  if (!req.query.path) return res.status(403).send('param domain is required')

  let incomingNote = {
    id: user.id,
    domain: req.query.domain,
    path: req.query.path,
    content: req.query.content
  }

  let note = new Note(incomingNote)

  let where = {
    id: user.id,
    domain: req.query.domain,
    path: req.query.path
  }

  Note.find(where, (err, doc) => {
    if (err) return res.status(500).send(err.message)

    if (doc.length === 0) {
      note.save((err, result) => {
        if (err) return res.status(500).send(err.message)
        res.json({status: '200 ok'})
      })
    } else {
      Note.updateOne(where, incomingNote, (err, raw) => {
        if (err) return res.status(500).send(err.message)
        res.json({status: '200 ok'})
      })
    }
  })
}

module.exports = router
