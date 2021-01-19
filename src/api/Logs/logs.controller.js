const {Router} = require('express');
const Log = require('../../model/log.model');
const auth = require('../../middlewares/auth');
const asyncHandler = require("../async-handler");

const router = new Router()

/**
 * @swagger
 * /api/logs:
 *  get:
 *      tags:
 *          - logs
 *      description: 'gets all logs'
 *      responses:
 *          '200':
 *              description: 'A successful response'
 *          '401':
 *              description: 'Unauthorized for a user'
 */
//GET /api/logs
router.get('/',auth({required: true, roles: ['admin']}),asyncHandler(async (req, res) =>{
    const logs = await Log.query()
    res.send(logs)
}));

module.exports = router