const {Router} = require('express')
const Genre = require('../../model/genre.model')
const asyncHandler = require('../async-handler')
const GenreNotFoundException = require("../../exceptions/genre-not-found.exception");
const auth = require('../../middlewares/auth')

const router = new Router();

/**
 * @swagger
 * /api/genres:
 *  get:
 *      tags:
 *          - genres
 *      description: 'Use to show all genres'
 *      responses:
 *          '200':
 *              description: 'A successful response'
 *  post:
 *      tags:
 *          - genres
 *      parameters:
 *          - in: body
 *            name: genre
 *            description: 'The genre to create'
 *            schema:
 *              type: object
 *              required:
 *                  - name
 *              properties:
 *                  name:
 *                      type: string
 *      description: 'Use to add genre to DB'
 *      responses:
 *          '201':
 *              description: 'Genre created'
 *          '401':
 *              description: 'Unauthorized for a user'
 *
 * /api/genres/{id}:
 *  get:
 *      tags:
 *          - genres
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            type: integer
 *            description: 'Genre ID'
 *      description: 'Use to show a genre by ID'
 *      responses:
 *          '200':
 *              description: 'A successful response'
 *          '404':
 *              description: 'Genre not found'
 *  delete:
 *      tags:
 *          - genres
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            type: integer
 *            description: 'Genre ID'
 *      description: 'Use to delete a genre by ID'
 *      responses:
 *          '204':
 *              description: 'Genre deleted successfully'
 *          '401':
 *              description: 'Unauthorized for a user'
 *          '404':
 *              description: 'Genre not found'
 *  put:
 *      tags:
 *          - genres
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            type: integer
 *            description: 'Genre ID'
 *          - in: body
 *            name: genre
 *            description: 'Properties to update'
 *            schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *      description: 'Use to update a genre'
 *      responses:
 *          '201':
 *              description: 'Genre updated successfully'
 *          '401':
 *              description: 'Unauthorized for a user'
 *          '404':
 *              description: 'Genre not found'
 *
 *
 */

//GET /api/genres
router.get('/', asyncHandler( async (req, res) => {
    const genres = await Genre.query()
        .withGraphJoined('books')
        .withGraphJoined('authors')
        .modifyGraph('books', builder => builder.select('title'))
        .modifyGraph('authors', builder => builder.select('name', 'surname'));
    res.send(genres);
}))

//GET /api/genres/13
router.get('/:id',asyncHandler( async (req, res) => {
    const id = req.params.id;
    const genre = await Genre.query().findById(id)
        .withGraphJoined('books')
        .withGraphJoined('authors')
        .modifyGraph('books', builder => builder.select('title'))
        .modifyGraph('authors', builder => builder.select('name', 'surname'));
    if(!genre) throw new GenreNotFoundException();
    res.send(genre);
}))

//POST /api/genres
router.post('/', auth({required: true, roles: ['admin']}), asyncHandler( async (req, res) => {
    const genre = await Genre.query().insert({
        name: req.body.name,
    });
    res.status(201).send(genre);
}))

//PUT /api/genres/13
router.put('/:id', auth({required: true, roles: ['admin']}), asyncHandler( async (req, res) => {
    const id = req.params.id;
    const updatedGenre = await Genre.query().patchAndFetchById(id, req.body)
    if(!updatedGenre) throw new GenreNotFoundException();
    res.status(201).send(updatedGenre);
}))

//DELETE /api/genres/13
router.delete('/:id', auth({required: true, roles: ['admin']}), asyncHandler( async (req, res) => {
    const id = req.params.id;
    const deletedCount = await Genre.query().deleteById(id);
    if(deletedCount === 0) throw new GenreNotFoundException();
    res.status(204).end();
}))

module.exports = router;