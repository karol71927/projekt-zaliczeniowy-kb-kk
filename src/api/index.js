const {Router} = require('express');
const booksRouter = require('./Books/books.controller');
const publisherRouter = require('./Publishers/publishers.controller');
const authorsRouter = require('./Authors/authors.controller')
const genresRouter = require('./Genres/genres.controller');
const usersRouter = require('./Users/users.controller');
const reviewsRouter = require('./Reviews/review.controller');
const authRouter = require('./auth/auth.controller');
const logRouter = require('./Logs/logs.controller');
const router = new Router();

router.use('/auth',authRouter);
router.use('/books',booksRouter);
router.use('/publishers',publisherRouter);
router.use('/authors',authorsRouter);
router.use('/genres',genresRouter);
router.use('/users', usersRouter);
router.use('/reviews',reviewsRouter);
router.use('/logs',logRouter);


module.exports = router;