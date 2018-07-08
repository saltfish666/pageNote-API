1. root url
    api.pagenote.xyz

2. Authorization
  all request show have an authorization header
```
headers: {
  Authorization: token 7bdde0af0f6adf2ada7f0433089866b6e*****
}
```

3. get login user info

GET /user

return:
```
{
  "oauth": "github",
  "name": "saltfish666",
  "email": ""
}
```

3. get notes

GET /note

```
params: {
  damain: "https://github.com/",
  path: "/saltfish666/pageNote-node"
}
```
result:
```
[
  {
    content: "hi, I wirte a note by pagenote on github"
  }
]
```
result always is array even if there is only one resule or null

3. post a note to server

POST /note

```
params: {
  damain: "https://github.com/",
  path: "/saltfish666/pageNote-node",
  content: "hi, I wirte a note by pagenote on github"
}
```
result:
```
{
	status: "200 ok"
}
```




















