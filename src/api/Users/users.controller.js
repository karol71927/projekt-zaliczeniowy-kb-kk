const {Router} = require('express');
const User = require('../../model/user.model');
const List = require('../../model/list.model');
const Log = require('../../model/log.model');
const asyncHandler = require('../async-handler');
const UserNotFoundException = require("../../exceptions/user-not-found.exception");
const MissingDataException = require("../../exceptions/missing-data.exception");
const auth = require('../../middlewares/auth')
const UnauthorizedException = require("../../exceptions/unauthorized.exception");
const log = require("../../middlewares/log");

const router = new Router();

/**
 * @swagger
 * /api/users:
 *  get:
 *      tags:
 *          - users
 *      description: 'Use to show all users'
 *      responses:
 *          '200':
 *              description: 'A successful response'
 *          '401':
 *              description: 'Unauthorized for a user'
 *
 *  post:
 *      tags:
 *          - users
 *      parameters:
 *          - in: body
 *            name: user
 *            description: 'Adding user to DB'
 *            schema:
 *              type: object
 *              required:
 *                  - nickname
 *                  - login
 *                  - password
 *                  - email
 *              properties:
 *                  nickname:
 *                      type: string
 *                  login:
 *                      type: string
 *                  password:
 *                      type: string
 *                  email:
 *                      type: string
 *      description: 'Use to register a user'
 *      responses:
 *          '201':
 *              description: 'User registered successfully'
 *          '409':
 *              description: 'User already exists'
 *          '422':
 *              description: 'Missing data - password, login, email or nickname'
 *
 * /api/users/{id}:
 *  get:
 *      tags:
 *          - users
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            type: integer
 *            description: 'User ID'
 *      description: 'Use to show a user by ID'
 *      responses:
 *          '200':
 *              description: 'A successful response'
 *          '401':
 *              description: 'Unauthorized for a user'
 *          '404':
 *              description: 'User not found'
 *
 * /api/users/{id}/list:
 *  get:
 *      tags:
 *          - users
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            type: integer
 *            description: 'User ID'
 *      description: 'Use to show user`s list of books'
 *      responses:
 *          '200':
 *              description: 'A successful response'
 *          '404':
 *              description: 'User not found'
 * post:
 *      tags:
 *          - users
 *      security:
 *          - OAuth2: [admin]
 *      parameters:
 *          - in: body
 *            name: user
 *            description: 'Adding book to the list'
 *            schema:
 *              type: object
 *              required:
 *                  - ID_book
 *                  - ID_user
 *              properties:
 *                  ID_book:
 *                      type: integer
 *                  ID_user:
 *                      type: integer
 *      description: 'Use to add a book to the list'
 *      responses:
 *          '201':
 *              description: 'Book added'
 *          '401':
 *              description: 'Unauthorized for this user'
 *
 * /api/users/{id}/list?ID_book=1:
 *  delete:
 *      tags:
 *          - users
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            type: integer
 *            description: 'User ID'
 *          - in: query
 *            name: ID_book
 *            required: true
 *            schema:
 *              type: integer
 *            description: 'Book ID'
 *      description: 'Use to delete a book from the user`s list'
 *      responses:
 *          '204':
 *              description: 'Book from the list deleted successfully'
 *          '401':
 *              description: 'Unauthorized for this user'
 *          '404':
 *              description: 'Book not found'
 *
 */

//GET api/users
router.get('/', auth({required: true, roles: ['admin']}), asyncHandler( async (req, res) => {
    const users = await User.query()
        .select('users.ID_user','nickname','status','email')
    res.send(users);
}))

//GET /api/users/13
router.get('/:id', auth({required: true, roles: ['admin']}), asyncHandler( async (req, res) => {
    const id = req.params.id;
    const user = await User.query().findById(id)
        .select('users.ID_user','nickname','status','email')
    if(!user) throw new UserNotFoundException();
    res.send(user);
}))

//GET /api/users/13/list
router.get('/:id/list', auth({required: true, roles: ['admin','user']}), asyncHandler( async (req, res) => {
    const id = req.params.id;
    const user = await User.query().findById(id)
        .select('users.ID_user','nickname','status','email')
        .withGraphJoined('books')
        .modifyGraph('books', builder => builder.select('title','description','pages'))
    if(!user) throw new UserNotFoundException();
    res.send(user);
}))

//POST /api/users/13/list
router.post('/:id/list', auth({required: true, roles: ['admin','user']}), asyncHandler(async (req, res) => {
    if(req.user.ID_user.toString() !== req.params.id.toString()){
        await Log.query().insert({
            description: 'User ' + req.user.login + ' tried to modify user ' + req.params.id + ' list',
            code: '401'
        })
        throw new UnauthorizedException();
    }
    const book = await List.query().insert({
        ID_user: req.user.ID_user,
        ID_book: req.body.ID_book
    });
    await log(req,req.user.login,'added book to the list',201)
    res.status(201).send(book);
}))

//DELETE /api/users/13/list?ID_book=1
router.delete('/:id/list', auth({required: true, roles: ['admin','user']}), asyncHandler( async (req, res) => {
    if(req.user.ID_user.toString() !== req.params.id.toString()){
        await Log.query().insert({
            description: 'User ' + req.user.login + ' tried to modify user ' + req.params.id + ' list',
            code: '401'
        })
        throw new UnauthorizedException();
    }
    const id_user = req.user.ID_user;
    const id_book = req.query.ID_book;
    console.log(id_user);
    console.log(id_book);
    await log(req, req.user.login,'deleted book from the list',204)
    const deletedCount = await List.query().delete()
        .where('ID_user', '=', id_user)
        .where('ID_book', '=', id_book);

    res.status(204).end();
}))

//POST /api/users
router.post('/',asyncHandler(async (req, res) => {
    if(req.body.nickname === undefined
        || req.body.password === undefined
        || req.body.login === undefined
        || req.body.email === undefined)
        throw new MissingDataException();
    const data = await User.query()
        .select('email', 'login')
        .where('email','=', req.body.email)
        .orWhere('login', '=', req.body.login)

    const user = await User.query().insert({
        nickname: req.body.nickname,
        login: req.body.login,
        password: req.body.password,
        status: "user",
        email: req.body.email
    })
    await log(req, req.body.login, 'successfully signed in', 201)
    res.status(201).send({
        nickname: req.body.nickname,
        login: req.body.login,
        email: req.body.email
    });
}))

module.exports = router