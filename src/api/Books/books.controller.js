const {Router} = require('express')
const Book = require('../../model/book.model')
const asyncHandler = require('../async-handler')
const BookNotFoundException = require("../../exceptions/book-not-found.exception");

const router = new Router();

//request - to co klient przesle
//response - to co bedziemy odsylac

//GET /api/Books
router.get('/', asyncHandler( async (req, res) => {
    const books = await Book.query()
        .withGraphJoined('authors')
        .withGraphJoined('reviews')
        .withGraphJoined('publishers')
        .modifyGraph('authors', builder => builder.select('name', 'surname'))
        .modifyGraph('reviews', builder => builder.select('contents','date','rate'))
        .modifyGraph('publishers', builder => builder.select('name'));
    res.send(books);
}))

//GET /api/Books/13
router.get('/:id',asyncHandler( async (req, res) => {
    const id = req.params.id;
    const book = await Book.query().findById(id)
        .withGraphJoined('authors')
        .withGraphJoined('reviews')
        .withGraphJoined('publishers')
        .modifyGraph('authors', builder => builder.select('name', 'surname'))
        .modifyGraph('reviews', builder => builder.select('contents','date','rate'))
        .modifyGraph('publishers', builder => builder.select('name'));
    if(!book) throw new BookNotFoundException();
    res.send(book);
}))

//POST /api/books
router.post('/', asyncHandler( async (req, res) => {
    const book = await Book.query().insert({
        title: req.body.title,
        description: req.body.description,
        pages: req.body.pages,
        ID_publisher: req.body.ID_publisher,
        ID_genre: req.body.ID_genre,
        releaseDate: req.body.releaseDate,
        ID_author: req.body.ID_author
    });
    res.status(201).send(book);
}))

//PUT /api/books/13
router.put('/:id', asyncHandler( async (req, res) => {
    const id = req.params.id;
    const updatedBook = await Book.query().patchAndFetchById(id, req.body)
    if(!updatedBook) throw new BookNotFoundException();
    res.status(201).send(updatedBook);
}))

//DELETE /api/books/13
router.delete('/:id', asyncHandler( async (req, res) => {
    const id = req.params.id;
    const deletedCount = await Book.query().deleteById(id);
    if(deletedCount === 0) throw new BookNotFoundException();
    res.status(204).end();
}))

module.exports = router;

