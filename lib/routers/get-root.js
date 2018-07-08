const express = require('express')
const router = express.Router()

router.use((req, res) => {
  res.send('server is running')
})

module.exports = router
