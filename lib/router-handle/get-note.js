const User = require('../models/User')
const Note = require('../models/Note')

module.exports = (req,res) => {
  let token = req.query.token

  User.find({'token':token}, (err,doc) => {
    if(err) return res.json({status: 'err',msg: err.message})
    console.log(doc)
    if(!doc.length) return res.json({status: 'err',msg: 'token doesnot match user'})

    let user = doc[0]
    let where = {}
    where.id = user.oauth + user.name
    if(req.query.domain) where.domain = req.query.domain
    if(req.query.path) where.path = req.query.path

    Note.find(where, (err, doc) => {
      if(err) return res.json({status: 'err',msg: err.message})

      res.json({
          status: 'ok',
          msg: doc
        })
    })
  })
}