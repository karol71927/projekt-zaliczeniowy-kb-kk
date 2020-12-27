const {Router} = require('express')
const Author = require('../../model/author.model')
const asyncHandler = require('../async-handler')
const AuthorNotFoundException = require("../../exceptions/author-not-found.exception");

const router = new Router();

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
router.post('/', asyncHandler( async (req, res) => {
    const author = await Author.query().insert({
        name: req.body.name,
        surname: req.body.surname,
        info: req.body.info
    });
    res.status(201).send(author);
}))

//PUT /api/authors/1
router.put('/:id', asyncHandler( async (req, res) => {
    const id = req.params.id;
    const updatedAuthor = await Author.query().patchAndFetchById(id, req.body)
    if(!updatedAuthor) throw new AuthorNotFoundException();
    res.status(201).send(updatedAuthor);
}))

//DELETE /api/authors/13
router.delete('/:id', asyncHandler( async (req, res) => {
    const id = req.params.id;
    const deletedCount = await Author.query().deleteById(id);
    if(deletedCount === 0) throw new AuthorNotFoundException();
    res.status(204).end();
}))

module.exports = router;