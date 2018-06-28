const querystring = require('querystring');

const express = require('express');
const request = require('request');

const User = require('./models/User')
const Note = require('./models/Note')
const getUserFromToken = require('./getUserFromToken')

let app = express()

let githubCallbackFun = require('./githubCallbackFun.js')

app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200); /让options请求快速返回/
  }
  else {
    next();
  }
})

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
})

app.get('/github/callback', githubCallbackFun)

app.listen(8072,function(){
  console.log('listening localhost:8072')
})
