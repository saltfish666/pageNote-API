const express = require('express')

let app = express()

app.all('*', require('./router-handle/all-*.js'))

app.get('/', require('./router-handle/get-root.js'))

app.get('/user', require('./router-handle/get-user.js'))

app.get('/note', require('./router-handle/get-note.js'))

app.post('/note', require('./router-handle/post-note.js'))

app.get('/github/callback', require('./router-handle/get-github-callback.js'))

app.listen(8072, function () {
  console.log('listening localhost:8072')
})
