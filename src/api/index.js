const {Router} = require('express');
const booksRouter = require('./Books/books.controller');
const publisherRouter = require('./Publishers/publishers.controller')
const router = new Router();

router.use('/books',booksRouter);
router.use('/publishers',publisherRouter);

module.exports = router;