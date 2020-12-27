const {Model} = require('objection');
const knex = require('../knex');

Model.knex(knex);

class ReviewModel extends Model {
    static get tableName(){
        return 'reviews';
    }

    static get idColumn(){
        return 'ID_review';
    }

    static get jsonSchema(){
        return {
            type: 'object',
            properties: {
                ID_book: {type: 'integer'},
                ID_user: {type: 'integer'},
                contents: {type: 'string'},
                date: {type: 'date'},
                rate: {type: 'integer'}
            }
        }
    }

    static get relationMappings() {
        return {
            books: {
                relation: Model.BelongsToOneRelation,
                modelClass: require('./book.model'),
                join: {
                    from: 'reviews.ID_book',
                    to: 'books.ID_book'
                }
            },
            users:{
                relation: Model.BelongsToOneRelation,
                modelClass: require('./user.model'),
                join: {
                    from: 'reviews.ID_user',
                    to: 'users.ID_user'
                }
            }
        }
    }
}

module.exports = ReviewModel;