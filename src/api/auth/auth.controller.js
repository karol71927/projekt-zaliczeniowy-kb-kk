const {Router} = require('express');
const User = require('../../model/user.model');
const Log = require('../../model/log.model');
const asyncHandler = require('../async-handler');
const config = require('../../../config');
const UnauthorizedException = require("../../exceptions/unauthorized.exception");
const {sign} = require('../../services/jwt')
const argon2 = require('argon2')
const log = require("../../middlewares/log");

const router = new Router();

//POST /api/auth
/**
 * @swagger
 * /api/auth:
 *  post:
 *      parameters:
 *          - in: header
 *            name: username
 *            type: string
 *            required: true
 *          - in: header
 *            name: password
 *            type: string
 *            required: true
 *      description: 'Use to log in and get JWT'
 *      responses:
 *          '201':
 *              description: 'User successfully logged in'
 *              headers:
 *                  Set-Cookie:
 *                      schema:
 *                          type: string
 *          '401':
 *              description: 'User failed to log in because of wrong password or lack of data'
 *
 */
router.post('/',asyncHandler(async (req, res) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        throw new UnauthorizedException();
    }

    const b64auth = authHeader.split(' ')[1] || ''
    let [name, password] = Buffer.from(b64auth, 'base64').toString().split(':')
    const user = await User.query()
        .select('ID_user','status', 'password', 'login')
        .where('email','=',name)
        .orWhere('login','=',name)
    try {
        if(await argon2.verify(user[0].password, password)) {
            const token = sign(user[0].ID_user, user[0].status, user[0].login);
            res.cookie('auth', token, config.cookiesOptions);
            await log(req, name, 'successfully logged in',201)
            return res.status(201).send({
                ID_user: user[0].ID_user,
                status: user[0].status
            });
        }
        else {
            await log(req,name,'failed to log in because of wrong password',401)
            throw new UnauthorizedException();
        }
    } catch (e){
        throw new UnauthorizedException();
    }
}))

module.exports = router;