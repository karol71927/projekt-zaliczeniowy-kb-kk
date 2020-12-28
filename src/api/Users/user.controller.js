const {Router} = require('express');
const User = require('../../model/user.model');
const List = require('../../model/list.model');
const Book = require('../../model/book.model');
const asyncHandler = require('../async-handler');

const router = new Router();

//GET api/users
router.get('/', asyncHandler( async (req, res) => {
    const users = await User.query()
        .select('users.ID_user','nickname','status','email')
    res.send(users);
}))

//GET /api/users/13
router.get('/:id',asyncHandler( async (req, res) => {
    const id = req.params.id;
    const user = await User.query().findById(id)
        .select('users.ID_user','nickname','status','email')
    if(!user) throw new UserNotFoundException();
    res.send(user);
}))

//GET /api/users/13/list
router.get('/:id/list',asyncHandler( async (req, res) => {
    const id = req.params.id;
    const user = await User.query().findById(id)
        .select('users.ID_user','nickname','status','email')
        .withGraphJoined('books')
        .modifyGraph('books', builder => builder.select('title','description','pages'))
    if(!user) throw new UserNotFoundException();
    res.send(user);
}))

//POST /api/users/13/list
router.post('/:id/list',asyncHandler(async (req, res) => {
    const book = await List.query().insertGraph({
        ID_user: req.body.ID_user,
        ID_book: req.body.ID_book
    });
    res.status(201).send(book);
}))

//DELETE /api/users/13/list?ID_book=1
router.delete('/:id/list', asyncHandler( async (req, res) => {
    const id_user = req.params.id;
    const id_book = req.query.ID_book;
    console.log(id_user);
    console.log(id_book);
    const deletedCount = await List.query().delete()
        .where('ID_user', '=', id_user)
        .where('ID_book', '=', id_book);

    res.status(204).end();
}))

module.exports = router