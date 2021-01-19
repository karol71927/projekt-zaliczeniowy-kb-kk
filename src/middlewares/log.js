const Log = require('../model/log.model')

const log = async (req, login, description, code) => {
    await Log.query().insert({
        description: req.ip + ' : ' + login + ' : ' + description,
        code: code.toString()
    })
}

module.exports = log