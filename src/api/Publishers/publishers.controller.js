const {Router} = require('express');
const Publisher = require('../../model/publisher.model');
const asyncHandler = require('../async-handler')
const PublisherNotFoundException = require('../../exceptions/publisher-not-found.exception')
const auth = require('../../middlewares/auth')

const router = new Router();

/**
 * @swagger
 * /api/publishers:
 *  get:
 *      tags:
 *          - publishers
 *      description: 'Use to show all publishers'
 *      responses:
 *          '200':
 *              description: 'A successful response'
 *  post:
 *      tags:
 *          - publishers
 *      parameters:
 *          - in: body
 *            name: publisher
 *            description: 'The publisher to create'
 *            schema:
 *              type: object
 *              required:
 *                  - name
 *              properties:
 *                  name:
 *                      type: string
 *      description: 'Use to add publisher to DB'
 *      responses:
 *          '201':
 *              description: 'Publisher created'
 *          '401':
 *              description: 'Unauthorized for a user'
 *
 * /api/publishers/{id}:
 *  get:
 *      tags:
 *          - publishers
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            type: integer
 *            description: 'Publisher ID'
 *      description: 'Use to show a publisher by ID'
 *      responses:
 *          '200':
 *              description: 'A successful response'
 *          '404':
 *              description: 'Publisher not found'
 *  delete:
 *      tags:
 *          - publishers
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            type: integer
 *            description: 'Publisher ID'
 *      description: 'Use to delete a publisher by ID'
 *      responses:
 *          '204':
 *              description: 'Publisher deleted successfully'
 *          '401':
 *              description: 'Unauthorized for a user'
 *          '404':
 *              description: 'Publisher not found'
 *  put:
 *      tags:
 *          - publishers
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            type: integer
 *            description: 'Publisher ID'
 *          - in: body
 *            name: publisher
 *            description: 'Properties to update'
 *            schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *      description: 'Use to update a publisher'
 *      responses:
 *          '201':
 *              description: 'Publisher updated successfully'
 *          '401':
 *              description: 'Unauthorized for a user'
 *          '404':
 *              description: 'Publisher not found'
 *
 *
 */

//GET api/publishers
router.get('/', asyncHandler( async (req, res) => {
    const publishers = await Publisher.query()
        .withGraphJoined('books')
        .withGraphJoined('authors')
        .modifyGraph('books', builder => builder.select('title'))
        .modifyGraph('authors', builder => builder.select('name', 'surname'));
    res.send(publishers);
}))

//GET /api/publishers/13
router.get('/:id',asyncHandler( async (req, res) => {
    const id = req.params.id;
    const publisher = await Publisher.query().findById(id).withGraphJoined('books')
        .withGraphJoined('authors')
        .modifyGraph('books', builder => builder.select('title'))
        .modifyGraph('authors', builder => builder.select('name', 'surname'));
    if(!publisher) throw new PublisherNotFoundException();
    res.send(publisher);
}))

//POST /api/publishers
router.post('/', auth({required: true, roles: ['admin']}), asyncHandler(async (req, res) => {
    const publisher = await Publisher.query().insert({
        name: req.body.name
    });
    res.status(201).send(publisher);
}))

router.put('/:id', auth({required: true, roles: ['admin']}), asyncHandler( async (req, res) => {
    const id = req.params.id;
    const updatedPublisher = await Publisher.query().patchAndFetchById(id, {
        name: req.body.name
    });
    if (!updatedPublisher) throw new PublisherNotFoundException();
    res.status(201).send(updatedPublisher);
}))

//DELETE /api/publisher/13
router.delete('/:id', auth({required: true, roles: ['admin']}), asyncHandler( async (req, res) => {
    const id = req.params.id;
    const deletedCount = await Publisher.query().deleteById(id);
    if(deletedCount === 0) throw new PublisherNotFoundException();
    res.status(204).end();
}))

module.exports = router;