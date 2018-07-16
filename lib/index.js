const express = require('express')

let app = express()

/* this router can not use user-handler */
app.get('/github/callback', require('./routers/get-github-callback.js'))

/* set header for cors */
app.use(require('./routers/cors.js'))

/* should before token test */
app.use('/', require('./routers/root.js'))

/* set req.user */
app.use(require('./routers/user-handler.js'))

app.use('/user', require('./routers/user.js'))

app.use('/note', require('./routers/note.js'))

app.listen(8072, function () {
  console.log('listening localhost:8072')
})
