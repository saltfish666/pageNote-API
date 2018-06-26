const querystring = require('querystring');

const express = require('express');
const request = require('request');

let app = express();

let githubCallbackFun = require('./githubCallbackFun.js')

app.get('/user',async function(req,res){
  let token = req.query.token
  
  //数据库通过token查询用户信息，返回user
  if(!user) return res.send('bad token')

  res.json(user)

})

app.get('note',async (req,res) => {
  let token = req.query.token

  //数据库通过token查询用户信息，返回user
  if(!user) return res.send('bad token')

  //通过user 获取id

  let domain = req.query.domain
  //如果domain 为空 返回该id所有数据            数组

  let path = req.query.path
  //如果domain 为空 返回该id 当前domain所有数据 数组


  //返回该id 当前domain path的数据            单个对象

})

app.post('note', async (req, res) => {
  let token = req.query.token

  //数据库通过token查询用户信息，返回user
  if(!user) return res.send('bad token')

  //传入的应该是数组
  array.forEach((item) => {
    let data = {
      id : user.id,
      ...
    }
    //向数据路插入数据

    //返回200 state
  })
})

app.get('/github/callback', githubCallbackFun)

app.listen(8072,function(){
  console.log('listening localhost:8099')
})
