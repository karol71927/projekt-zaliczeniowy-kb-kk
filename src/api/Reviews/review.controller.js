const {Router} = require('express');
const Review = require('../../model/review.model');
const asyncHandler = require('../async-handler');
const ReviewNotFoundException = require('../../exceptions/review-not-found.exception');
const auth = require('../../middlewares/auth')
const UnauthorizedException = require("../../exceptions/unauthorized.exception");
const log = require("../../middlewares/log");

const router = new Router();

/**
 * @swagger
 * /api/reviews:
 *  get:
 *      tags:
 *          - reviews
 *      description: 'Use to show all reviews'
 *      responses:
 *          '200':
 *              description: 'A successful response'
 *  post:
 *      tags:
 *          - reviews
 *      parameters:
 *          - in: body
 *            name: review
 *            description: 'The review to create'
 *            schema:
 *              type: object
 *              required:
 *                  - ID_book
 *                  - ID_user
 *                  - contents
 *                  - date
 *                  - rate
 *              properties:
 *                  ID_book:
 *                      type: integer
 *                  ID_user:
 *                      type: integer
 *                  contents:
 *                      type: string
 *                  date:
 *                      type: string
 *                  rate:
 *                      type: integer
 *      description: 'Use to add review to DB'
 *      responses:
 *          '201':
 *              description: 'Review created'
 *
 * /api/reviews/{id}:
 *  get:
 *      tags:
 *          - reviews
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            type: integer
 *            description: 'Review ID'
 *      description: 'Use to show a review by ID'
 *      responses:
 *          '200':
 *              description: 'A successful response'
 *          '404':
 *              description: 'Review not found'
 *  delete:
 *      tags:
 *          - reviews
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            type: integer
 *            description: 'Review ID'
 *      description: 'Use to delete a review by ID'
 *      responses:
 *          '204':
 *              description: 'Review deleted successfully'
 *          '401':
 *              description: 'Unauthorized for this user'
 *          '404':
 *              description: 'Review not found'
 *  put:
 *      tags:
 *          - reviews
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            type: integer
 *            description: 'Review ID'
 *          - in: body
 *            name: review
 *            description: 'Properties to update'
 *            schema:
 *              type: object
 *              properties:
 *                  ID_book:
 *                      type: integer
 *                  ID_user:
 *                      type: integer
 *                  contents:
 *                      type: string
 *                  date:
 *                      type: string
 *                  rate:
 *                      type: integer
 *      description: 'Use to update a review'
 *      responses:
 *          '201':
 *              description: 'Review updated successfully'
 *          '401':
 *              description: 'Unauthorized for this user'
 *          '404':
 *              description: 'Review not found'
 *
 *
 */

//GET api/reviews
router.get('/', asyncHandler( async (req, res) => {
    const reviews = await Review.query()
        .withGraphJoined('users')
        .withGraphJoined('books')
        .modifyGraph('users', builder => builder.select('nickname'))
        .modifyGraph('books', builder => builder.select('title'))
    res.send(reviews);
}))

//GET /api/reviews/13
router.get('/:id',asyncHandler( async (req, res) => {
    const id = req.params.id;
    const review = await Review.query().findById(id)
        .withGraphJoined('users')
        .withGraphJoined('books')
        .modifyGraph('users', builder => builder.select('nickname'))
        .modifyGraph('books', builder => builder.select('title'))
    if(!review) throw new ReviewNotFoundException();
    res.send(review);
}))

//POST /api/reviews
router.post('/', auth({required: true, roles: ['admin','user']}), asyncHandler(async (req, res) => {
    const date = new Date().toISOString();
        const review = await Review.query().insert({
        ID_book: req.body.ID_book,
        ID_user: req.user.ID_user,
        contents: req.body.contents,
        date: date,
        rate: req.body.rate

    });
    await log(req,req.user.login,'added review to book ' + req.body.ID_book,201)
    res.status(201).send(review);
}))

//PUT /api/reviews/13
router.put('/:id', auth({required: true, roles: ['admin','user']}), asyncHandler( async (req, res) => {
    const id = req.params.id;
    const date = new Date().toISOString();
    const review = await Review.query().findById(id).select('ID_user')
    if(!review)
        throw new ReviewNotFoundException();
    if (req.user.ID_user.toString() !== review.ID_user.toString()){
        await log(req, req.user.login,'tried to modify review of the user: ' + review.ID_user,401)
        throw new UnauthorizedException()
    }
    const updatedReview = await Review.query().patchAndFetchById(id, {
        contents: req.body.contents,
        date: date,
        rate: req.body.rate
    });
    if (!updatedReview) throw new ReviewNotFoundException();
    await log(req,req.user.login,'updated review of the book: ' + req.body.ID_book,201)
    res.status(201).send(updatedReview);
}))

//DELETE /api/reviews/13
router.delete('/:id', auth({required: true, roles: ['admin','user']}), asyncHandler( async (req, res) => {
    const id = req.params.id;
    const review = await Review.query().findById(id).select('ID_user')
    if(!review)
        throw new ReviewNotFoundException();
    if (req.user.ID_user.toString() !== review.ID_user.toString()){
        await log(req, req.user.login,'tried to modify review of the user: ' + review.ID_user,401)
        throw new UnauthorizedException()
    }
    const deletedCount = await Review.query().deleteById(id);
    if(deletedCount === 0) throw new ReviewNotFoundException();
    await log(req, req.user.login,'deleted review of the book: ' + req.body.ID_book,201)
    res.status(204).end();
}))

module.exports = router