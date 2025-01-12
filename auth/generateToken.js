const jwt = require('jsonwebtoken')

const secrets = require('../config/secrets.js')

module.exports = function (user) {
  const payload = {
    subject: user.id,
    username: user.username
  }

  const options = {
    expiresIn: '10m',
  }

  return jwt.sign(payload, secrets.jwtSecret, options)
}
