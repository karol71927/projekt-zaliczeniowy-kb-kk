const {Model} = require('objection');
const knex = require('../knex');
const {BookModel} = require('book.model');
const {UserModel} = require('user.model')

Model.knex(knex);

class ReviewModel extends Model {
    static get tableName(){
        return 'reviews';
    }

    static get jsonSchema(){
        return {
            type: 'object',
            properties: {
                ID_review: {type: 'integer'},
                ID_book: {type: 'integer'},
                ID_user: {type: 'integer'},
                contents: {type: 'string'},
                date: {type: 'date'},
                rate: {type: 'integer'}
            }
        }
    }

    static relationMappings = {
        books: {
            relation: Model.BelongsToOneRelation,
            modelClass: BookModel,
            join: {
                from: 'reviews.ID_book',
                to: 'books.ID_book'
            }
        },
        users:{
            relation: Model.BelongsToOneRelation,
            modelClass: UserModel,
            join: {
                from: 'reviews.ID_user',
                to: 'users.ID_user'
            }
        }
    }
}

module.exports = ReviewModel;