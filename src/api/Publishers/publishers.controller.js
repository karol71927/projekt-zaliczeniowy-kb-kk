const {Router} = require('express');
const Publisher = require('../../model/publisher.model');
const asyncHandler = require('../async-handler')
const PublisherNotFoundException = require('../../exceptions/publisher-not-found.exception')

const router = new Router();

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
router.post('/',asyncHandler(async (req, res) => {
    const publisher = await Publisher.query().insert({
        name: req.body.name
    });
    res.status(201).send(publisher);
}))

router.put('/:id',asyncHandler( async (req, res) => {
    const id = req.params.id;
    const updatedPublisher = await Publisher.query().patchAndFetchById(id, {
        name: req.body.name
    });
    if (!updatedPublisher) throw new PublisherNotFoundException();
    res.status(201).send(updatedPublisher);
}))

//DELETE /api/publisher/13
router.delete('/:id', asyncHandler( async (req, res) => {
    const id = req.params.id;
    const deletedCount = await Publisher.query().deleteById(id);
    if(deletedCount === 0) throw new PublisherNotFoundException();
    res.status(204).end();
}))

module.exports = router;