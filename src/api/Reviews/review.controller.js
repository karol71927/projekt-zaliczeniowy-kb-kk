const {Router} = require('express');
const Review = require('../../model/review.model');
const asyncHandler = require('../async-handler');
const ReviewNotFoundException = require('../../exceptions/review-not-found.exception');

const router = new Router();

//GET api/reviews
router.get('/', asyncHandler( async (req, res) => {
    const reviews = await Review.query()
        .withGraphJoined('users')
        .withGraphJoined('books')
        .withGraphJoined('authors')
        .modifyGraph('users', builder => builder.select('nickname'))
        .modifyGraph('books', builder => builder.select('title'))
        .modifyGraph('authors', builder => builder.select('name', 'surname'));
    res.send(reviews);
}))

//GET /api/reviews/13
router.get('/:id',asyncHandler( async (req, res) => {
    const id = req.params.id;
    const review = await Review.query().findById(id)
        .withGraphJoined('users')
        .withGraphJoined('books')
        .withGraphJoined('authors')
        .modifyGraph('users', builder => builder.select('nickname'))
        .modifyGraph('books', builder => builder.select('title'))
        .modifyGraph('authors', builder => builder.select('name', 'surname'));
    if(!review) throw new ReviewNotFoundException();
    res.send(review);
}))

//POST /api/reviews
router.post('/',asyncHandler(async (req, res) => {
    const review = await Review.query().insert({
        name: req.body.name
    });
    res.status(201).send(review);
}))

//PUT /api/reviews/13
router.put('/:id',asyncHandler( async (req, res) => {
    const id = req.params.id;
    const updatedReview = await Review.query().patchAndFetchById(id, {
        name: req.body.name
    });
    if (!updatedReview) throw new ReviewNotFoundException();
    res.status(201).send(updatedReview);
}))

//DELETE /api/reviews/13
router.delete('/:id', asyncHandler( async (req, res) => {
    const id = req.params.id;
    const deletedCount = await Review.query().deleteById(id);
    if(deletedCount === 0) throw new ReviewNotFoundException();
    res.status(204).end();
}))

module.exports = router