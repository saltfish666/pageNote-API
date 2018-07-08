const express = require('express')
const router = express.Router()

router.use((req, res) => {
  res.json(req.user)
})

module.exports = router
