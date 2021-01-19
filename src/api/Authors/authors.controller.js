const {Router} = require('express')
const Author = require('../../model/author.model')
const asyncHandler = require('../async-handler')
const AuthorNotFoundException = require("../../exceptions/author-not-found.exception");
const auth = require('../../middlewares/auth')

const router = new Router();


/**
 * @swagger
 * /api/authors:
 *  get:
 *      tags:
 *          - authors
 *      description: 'Use to show all authors'
 *      responses:
 *          '200':
 *              description: 'A successful response'
 *  post:
 *      tags:
 *          - authors
 *      parameters:
 *          - in: body
 *            name: author
 *            description: 'The author to create'
 *            schema:
 *              type: object
 *              required:
 *                  - name
 *                  - surname
 *                  - info
 *              properties:
 *                  name:
 *                      type: string
 *                  surname:
 *                      type: string
 *                  info:
 *                      type: string
 *      description: 'Add author to DB'
 *      responses:
 *          '201':
 *              description: 'Author created'
 *          '401':
 *              description: 'Unauthorized for a user'
 *
 * /api/authors/{id}:
 *  get:
 *      tags:
 *          - authors
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            type: integer
 *            description: 'Author ID'
 *      description: 'Use to show an author by ID'
 *      responses:
 *          '200':
 *              description: 'A successful response'
 *          '404':
 *              description: 'Author not found'
 *  delete:
 *      tags:
 *          - authors
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            type: integer
 *            description: 'Author ID'
 *      description: 'Use to delete an author by ID'
 *      responses:
 *          '204':
 *              description: 'Author deleted successfully'
 *          '401':
 *              description: 'Unauthorized for a user'
 *          '404':
 *              description: 'Author not found'
 *  put:
 *      tags:
 *          - authors
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            type: integer
 *            description: 'Author ID'
 *          - in: body
 *            name: author
 *            description: 'Properties to update'
 *            schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  surname:
 *                      type: string
 *                  info:
 *                      type: string
 *      description: 'Use to update an author'
 *      responses:
 *          '201':
 *              description: 'Author updated successfully'
 *          '401':
 *              description: 'Unauthorized for a user'
 *          '404':
 *              description: 'Author not found'
 *
 *
 */
//GET /api/authors
router.get('/', asyncHandler( async (req, res) => {
    const authors = await Author.query()
        .withGraphJoined('books')
        .withGraphJoined('publishers')
        .modifyGraph('books', builder => builder.select('title'))
        .modifyGraph('publishers', builder => builder.select('name'));
    res.send(authors);
}))

//GET /api/authors/13
router.get('/:id', asyncHandler( async (req, res) => {
    const id = req.params.id;
    const author = await Author.query().findById(id)
        .withGraphJoined('books')
        .withGraphJoined('publishers')
        .modifyGraph('books', builder => builder.select('title'))
        .modifyGraph('publishers', builder => builder.select('name'));
    if(!author) throw new AuthorNotFoundException();
    res.send(author);
}))

//POST /api/authors
router.post('/', auth({required: true, roles: ['admin']}), asyncHandler( async (req, res) => {
    const author = await Author.query().insert({
        name: req.body.name,
        surname: req.body.surname,
        info: req.body.info
    });
    res.status(201).send(author);
}))

//PUT /api/authors/13
router.put('/:id', auth({required: true, roles: ['admin']}), asyncHandler( async (req, res) => {
    const id = req.params.id;
    const updatedAuthor = await Author.query().patchAndFetchById(id, req.body)
    if(!updatedAuthor) throw new AuthorNotFoundException();
    res.status(201).send(updatedAuthor);
}))

//DELETE /api/authors/13
router.delete('/:id', auth({required: true, roles: ['admin']}), asyncHandler( async (req, res) => {
    const id = req.params.id;
    const deletedCount = await Author.query().deleteById(id);
    if(deletedCount === 0) throw new AuthorNotFoundException();
    res.status(204).end();
}))

module.exports = router;