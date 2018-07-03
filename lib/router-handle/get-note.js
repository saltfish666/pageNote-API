const User = require('../models/User')
const Note = require('../models/Note')

module.exports = (req,res) => {
  console.log(res)
  console.log(req)
  let token = null
  
  try{ token = req.headers.authorization.split(' ')[0] } 
  catch(e) { return res.status(401).send('no token') }

  User.find({'token': token}, (err,doc) => {
    if(err) return res.status(500).res.send(err.message)

    if(!doc.length) return res.status(401).send('token doesnot match user')

    let user = doc[0]
    let where = {}
    where.id = user.oauth + user.name
    if(req.query.domain) where.domain = req.query.domain
    if(req.query.path) where.path = req.query.path

    Note.find(where, (err, doc) => {
      if(err) return res.status(500).res.send(err.message)

      res.json(doc)
    })
  })
}