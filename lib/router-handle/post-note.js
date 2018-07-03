const User = require('../models/User')
const Note = require('../models/Note')

module.exports = (req, res) => {
  let token = null
  
  try{ token = req.headers.authorization.split(' ')[1] } 
  catch(e) { return res.status(401).send('no token') }

  User.find({'token':token}, (err,doc) => {
    if(err) return res.status(500).res.send(err.message)

    if(!doc.length) return res.status(401).send('token doesnot match user')

    let user = doc[0]

    let where = {
      id: user.oauth + user.name,
      domain: req.query.domain,
      path: req.query.path
    }
    Note.find(where, (err, result) => {
      if(err) return res.status(500).res.send(err.message)

      if(result.length == 0){
        let note = new Note({
          id: user.oauth + user.name,
          domain: req.query.domain,
          path: req.query.path,
          content: req.query.content
        })
        note.save( (err, result) => {
          if(err) return res.status(500).res.send(err.message)

          res.json({status: '200 ok'})
        })
      }

      if(result.length > 0){
        let noteNewFeild = {
          content: req.query.content
        }
        Note.update(where, noteNewFeild, (err, result) => {
          if(err) return res.status(500).res.send(err.message)

          res.json({status: '200 ok'})
        })
      }
    })
    
  })
}