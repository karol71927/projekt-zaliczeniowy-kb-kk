const {Router} = require('express')
const Book = require('../../model/book.model')
const asyncHandler = require('../async-handler')
const BookNotFoundException = require("../../exceptions/book-not-found.exception");
const auth = require('../../middlewares/auth')

const router = new Router();

//request - to co klient przesle
//response - to co bedziemy odsylac

/**
 * @swagger
 * /api/books:
 *  get:
 *      tags:
 *          - books
 *      description: 'Use to show all books'
 *      responses:
 *          '200':
 *              description: 'A successful response'
 *  post:
 *      tags:
 *          - books
 *      parameters:
 *          - in: body
 *            name: book
 *            description: 'The book to create'
 *            schema:
 *              type: object
 *              required:
 *                  - title
 *                  - description
 *                  - pages
 *                  - ID_publisher
 *                  - ID_genre
 *                  - releaseDate
 *                  - ID_author
 *              properties:
 *                  title:
 *                      type: string
 *                  description:
 *                      type: string
 *                  pages:
 *                      type: integer
 *                  ID_publisher:
 *                      type: integer
 *                  ID_genre:
 *                      type: integer
 *                  releaseDate:
 *                      type: string
 *                  ID_author:
 *                      type: integer
 *      description: 'Use to add book to DB'
 *      responses:
 *          '201':
 *              description: 'Book created'
 *          '401':
 *              description: 'Unauthorized for a user'
 *
 * /api/books/{id}:
 *  get:
 *      tags:
 *          - books
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            type: integer
 *            description: 'Book ID'
 *      description: 'Use to show a book by ID'
 *      responses:
 *          '200':
 *              description: 'A successful response'
 *          '404':
 *              description: 'Book not found'
 *  delete:
 *      tags:
 *          - books
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            type: integer
 *            description: 'Book ID'
 *      description: 'Use to delete a book by ID'
 *      responses:
 *          '204':
 *              description: 'Book deleted successfully'
 *          '401':
 *              description: 'Unauthorized for a user'
 *          '404':
 *              description: 'Book not found'
 *  put:
 *      tags:
 *          - books
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            type: integer
 *            description: 'Book ID'
 *          - in: body
 *            name: book
 *            description: 'Properties to update'
 *            schema:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                  description:
 *                      type: string
 *                  pages:
 *                      type: integer
 *                  ID_publisher:
 *                      type: integer
 *                  ID_genre:
 *                      type: integer
 *                  releaseDate:
 *                      type: string
 *                  ID_author:
 *                      type: integer
 *      description: 'Use to update a book'
 *      responses:
 *          '201':
 *              description: 'Book updated successfully'
 *          '401':
 *              description: 'Unauthorized for a user'
 *          '404':
 *              description: 'Book not found'
 *
 *
 */

//GET /api/books
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
router.post('/', auth({required: true, roles: ['admin']}),  asyncHandler( async (req, res) => {
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
router.put('/:id', auth({required: true, roles: ['admin']}), asyncHandler( async (req, res) => {
    const id = req.params.id;
    const updatedBook = await Book.query().patchAndFetchById(id, {
        title: req.body.title,
        description: req.body.description,
        pages: req.body.pages,
        ID_publisher: req.body.ID_publisher,
        ID_genre: req.body.ID_genre,
        releaseDate: req.body.releaseDate,
        ID_author: req.body.ID_author
    })
    if(!updatedBook) throw new BookNotFoundException();
    res.status(201).send(updatedBook);
}))

//DELETE /api/books/13
router.delete('/:id', auth({required: true, roles: ['admin']}), asyncHandler( async (req, res) => {
    const id = req.params.id;
    const deletedCount = await Book.query().deleteById(id);
    if(deletedCount === 0) throw new BookNotFoundException();
    res.status(204).end();
}))

module.exports = router;

