const querystring = require('querystring');

const express = require('express');
const request = require('request');

const User = require('./models/User')
const Note = require('./models/Note')
const getUserFromToken = require('./getUserFromToken')

let app = express()

let githubCallbackFun = require('./githubCallbackFun.js')

app.get('/', (req, res) => {
   res.send('hi')
})

/*所有的请求都应该添加token的querystring*/

/* 返回值形如：
{
    "status": "ok",
    "msg": {
        "_id": "5b338e9269082d0ab9a24319",
        "oauth": "github",
        "name": "saltfish666",
        "email": "",
        "token": "tooooooken",
        "access_token": "eeeee",
        "__v": 0
    }
}
*/
app.get('/user', (req,res) => {
  let token = req.query.token
  
  User.find({ token: token}, (err,doc) => {
    if(err) return res.json({status: 'err',msg: err.message})
    
    if(!doc.length) return res.json({status: 'err',msg: 'token doesnot match user'})

    res.json({
      status: 'ok',
      msg:doc[0]
    })
  })
})


/* 返回值形如
{
    "status": "ok",
    "msg": [
        {
            "_id": "5b34486e6c04e6c0e5c091c6",
            "id": "githubsaltfish666",
            "sd": "sdfsdf"
        }
    ]
}
*/
app.get('/note', (req,res) => {
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
})


app.post('/note', async (req, res) => {
  let token = req.query.token

  User.find({'token':token}, (err,doc) => {
    if(err) return res.json({status: 'err',msg: err.message})
    if(!doc.length) return res.json({status: 'err',msg: 'token doesnot match user'})

    let user = doc[0]
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
  })
})

app.get('/github/callback', githubCallbackFun)

app.listen(8072,function(){
  console.log('listening localhost:8072')
})
