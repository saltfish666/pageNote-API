

GET /user

qs:

  - token 

return:

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


GET /note

qs:

  - token
  - domain
  - path

result:
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

domain 或 path 为空 返回所有域名或所有路径

POST /note

qs:

  - token
  - domain
  - path
  - content

  插入数据

result:
	{
	    "status": "ok"
	}

https://github.com/login/oauth/authorize?client_id=40e9e869abab72c0da76&scope=public_repo
直接跳转到https://github.com/saltfish666/pageNote-node?token=5d110c27866235e861b598862545f519064264ce



GET libai688.com:8072/user?token=5d110c27866235e861b598862545f519064264ce
{
    "status": "ok",
    "msg": {
        "_id": "5b3497b763b7e64d4aee1f4d",
        "id": "githubsaltfish666",
        "name": "saltfish666",
        "email": "overwall2016@gmail.com",
        "access_token": "ec462460915f545268895b168e53266872c011d5",
        "token": "5d110c27866235e861b598862545f519064264ce",
        "__v": 0
    }
}


POST libai688.com:8072/note?token=5d110c27866235e861b598862545f519064264ce&domain=www.baidu.com&path=/&content=hello

{
    "status": "ok"
}

GET libai688.com:8072/note?token=5d110c27866235e861b598862545f519064264ce&domain=www.baidu.com&path=/&content=hello
{
    "status": "ok",
    "msg": [
        {
            "_id": "5b349a966e24984e98707206",
            "id": "undefinedsaltfish666",
            "domain": "www.baidu.com",
            "path": "/",
            "content": "hello",
            "__v": 0
        }
    ]
}
















