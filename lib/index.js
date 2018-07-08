const express = require('express')

let app = express()

/* this router can not use user-handler */
app.get('/github/callback', require('./routers/get-github-callback.js'))

/* set header for cors */
app.use(require('./routers/cors.js'))

/* set req.user */
app.use(require('./routers/user-handler.js'))

app.get('/', require('./routers/get-root.js'))

app.get('/user', require('./routers/get-user.js'))

app.get('/note', require('./routers/get-note.js'))

app.post('/note', require('./routers/post-note.js'))

app.listen(8072, function () {
  console.log('listening localhost:8072')
})
