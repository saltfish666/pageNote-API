const User = require('../models/User')
const Note = require('../models/Note')

module.exports = (req, res) => {
  let token = req.query.token

  User.find({'token':token}, (err,doc) => {
    if(err) return res.json({status: 'err',msg: err.message})
    if(!doc.length) return res.json({status: 'err',msg: 'token doesnot match user'})

    let user = doc[0]

    let where = {
      id: user.oauth + user.name,
      domain: req.query.domain,
      path: req.query.path
    }
    Note.find(where, (err, result) => {
      if(err) return res.json({status: 'err',msg: err.message})

      if(result.length == 0){
        let note = new Note({
          id: user.oauth + user.name,
          domain: req.query.domain,
          path: req.query.path,
          content: req.query.content
        })
        note.save( (err, result) => {
          if(err) res.json({status: 'err', msg: err.message})
          res.json({status: 'ok'})
        })
      }

      if(result.length > 0){
        let noteNewFeild = {
          content: req.query.content
        }
        Note.update(where, noteNewFeild, (err, result) => {
          if(err) res.json({status: 'err', msg: err.message})
          res.json({status: 'ok'})
        })
      }
    })
    
  })
}