# pageNote-note
this is server side for [pageNote-vue](https://github.com/saltfish666/pageNote-vue)
write by nodejs.

branch | badge
---- | ---
master | [![Build Status](https://travis-ci.org/saltfish666/pageNote-API.svg?branch=master)](https://travis-ci.org/saltfish666/pageNote-API)[![codecov](https://codecov.io/gh/saltfish666/pageNote-API/branch/master/graph/badge.svg)](https://codecov.io/gh/saltfish666/pageNote-API)
dev |  [![Build Status](https://travis-ci.org/saltfish666/pageNote-API.svg?branch=dev)](https://travis-ci.org/saltfish666/pageNote-API)[![codecov](https://codecov.io/gh/saltfish666/pageNote-API/branch/dev/graph/badge.svg)](https://codecov.io/gh/saltfish666/pageNote-API)


[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/saltfish666/pageNote-node/issues)


## Usage
this project need to access to mongoDB, but this is private infomation.
this app read mongoURL from shell env.
shell:
```
export mongoURL=mongodb://user:password@ip:port/dbName
```
node:

```
 let mongoURL = process.env['mongoURL']
 ```
 you should set it by youself.

 If you are using docker, run it likes this:
```
docker run -d --rm --name=pagenote -p=8072:8072 -e mongoURL=$mongoURL saltfish666/pagenote-api

```

## Technology stack

express + mongoose (+ request docker)

## api doc
here is ajax [api doc](./doc/api.md)
