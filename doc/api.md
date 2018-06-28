

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
