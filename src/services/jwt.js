const jwt = require('jsonwebtoken');
const config = require('../../config')

const sign = (id, role, login) =>
    jwt.sign({ sub: id, role, login }, config.jwtSecret, { expiresIn: '1 day' })      // lub w sekundach

module.exports = {
    sign
}