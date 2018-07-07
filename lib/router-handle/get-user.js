const User = require('../models/User')

module.exports = (req,res) => {
  let token = null
  
  try{ token = req.headers.authorization.split(' ')[1] } 
  catch(e) { return res.status(401).send('no token') }
  
  User.find({ token: token}, (err,doc) => {
    if(err) return res.status(500).res.send(err.message)
    
    if(!doc.length) return res.status(401).send('token doesnot match user')
    
    console.log(doc)
    console.log(delete doc[0]["_id"])
    console.log(typeof doc[0])
    doc[0]["_id"] = null
    doc[0]["__v"] = null
    console.log(doc)
    res.json(doc[0])
  })
}