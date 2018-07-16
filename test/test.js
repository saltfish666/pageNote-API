require('../index.js')

const assert = require('assert')
const request = require('request')
const baseURL = 'http://localhost:8072'

describe('/', () => {
  it('should return "server is running" not matter if user login', (done) => {
    request.get(baseURL + '/', {
    }, (err, result, body) => {
      if (err) return done(err)

      if (body === 'server is running') return done()
    })
  })

  it('should set headers to fix CORS', (done) => {
    request.get(baseURL + '/', {
      headers: {
      }
    }, (err, res, body) => {
      if (err) return done(err)

      assert.equal(res.headers['access-control-allow-origin'], '*')
      assert(/.*Authorization.*/.test(res.headers['access-control-allow-headers']), 'should allow header: Authorization')
      assert(/.*DELETE.*/.test(res.headers['access-control-allow-methods']), 'should allow method: DELETE')
      assert(/.*OPTIONS.*/.test(res.headers['access-control-allow-methods']), 'should allow method: OPTIONS')
      assert(/.*PACTH.*/.test(res.headers['access-control-allow-methods']), 'should allow method: PACTH')
      done()
    })
  })
})

describe('/user', () => {
  it('GET: should return user info', (done) => {
    request.get(baseURL + '/user', {
      headers: {
        Authorization: 'bear atoken'
      }
    }, (err, result, body) => {
      if (err) return done(err)

      body = JSON.parse(body)
      assert(body.name, 'should return user.name')
      assert(body.id, 'should return user.id')
      done()
    })
  })
})

describe('/note', () => {
  it('GET: should return user\'s notes as array', (done) => {
    request.get(baseURL + '/note', {
      headers: {
        Authorization: 'bear atoken'
      }
    }, (err, result, body) => {
      if (err) return done(err)

      body = JSON.parse(body)
      console.log(body)
      assert(body.constructor === Array, 'should return array evenif it is empty')
      done()
    })
  })
  it('POST: should return 200', (done) => {
    let url = baseURL + '/note?'
    let params = {
      domain: 'pagenote.xyz',
      path: '/foo/bar',
      content: 'it it test content'
    }
    for (let key in params) {
      url += `&${key}=${params[key]}`
    }
    request.post(url, {
      headers: {
        Authorization: 'bear atoken'
      }
    }, (err, result, body) => {
      if (err) return done(err)

      assert(result.statusCode === 200)
      done()
    })
  })
  it('DELETE: should return 200', (done) => {
    let url = baseURL + '/note?'
    let params = {
      domain: 'pagenote.xyz',
      path: '/foo/bar',
      content: 'it it test content'
    }
    for (let key in params) {
      url += `&${key}=${params[key]}`
    }
    request.delete(url, {
      headers: {
        Authorization: 'bear atoken'
      }
    }, (err, result, body) => {
      if (err) return done(err)

      assert(result.statusCode === 200)
      done()
    })
  })
})

// 看来mocha会自动kill 子进程
