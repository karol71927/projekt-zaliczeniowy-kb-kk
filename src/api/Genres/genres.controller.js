const {Router} = require('express')
const Genre = require('../../model/genre.model')
const asyncHandler = require('../async-handler')
const GenreNotFoundException = require("../../exceptions/genre-not-found.exception");

const router = new Router();

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
router.post('/', asyncHandler( async (req, res) => {
    const genre = await Genre.query().insert({
        name: req.body.name,
    });
    res.status(201).send(genre);
}))

//PUT /api/genres/13
router.put('/:id', asyncHandler( async (req, res) => {
    const id = req.params.id;
    const updatedGenre = await Genre.query().patchAndFetchById(id, req.body)
    if(!updatedGenre) throw new GenreNotFoundException();
    res.status(201).send(updatedGenre);
}))

//DELETE /api/genres/13
router.delete('/:id', asyncHandler( async (req, res) => {
    const id = req.params.id;
    const deletedCount = await Genre.query().deleteById(id);
    if(deletedCount === 0) throw new GenreNotFoundException();
    res.status(204).end();
}))

module.exports = router;