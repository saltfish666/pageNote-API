# pageNote 后端

## api

通过localStorage存储token来保存登录状态
说有请求必须在URL通过查询字符串来传递token

GET /user
获得json格式的用户信息

GET /note
查询参数
domain 如果为空 返回所有域名的所有笔记

path 

一律返回数组

POST /note
一律数组
