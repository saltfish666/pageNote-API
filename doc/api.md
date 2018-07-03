Basic Auth:
    header {
        Authorization:token /TOKEN/
    }

GET /user

return:

   {
        "_id": "5b338e9269082d0ab9a24319",
        "oauth": "github",
        "name": "saltfish666",
        "email": "",
        "token": "tooooooken",
        "access_token": "eeeee",
        "__v": 0
    }



GET /note

qs:

  - domain
  - path

result:
[
      {
          "_id": "5b34486e6c04e6c0e5c091c6",
          "id": "githubsaltfish666",
          "sd": "sdfsdf"
      }
  ]

POST /note

qs:
  - domain
  - path
  - content

  插入数据

result:
	{
	    "status": "200 ok"
	}




















