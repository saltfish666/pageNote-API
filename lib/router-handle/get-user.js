const User = require('../models/User')

module.exports = (req,res) => {
  let token = req.query.token
  
  User.find({ token: token}, (err,doc) => {
    if(err) return res.json({status: 'err',msg: err.message})
    
    if(!doc.length) return res.json({status: 'err',msg: 'token doesnot match user'})

    res.json({
      status: 'ok',
      msg:doc[0]
    })
  })
}