const {Model} = require('objection');
const knex = require('../knex');
const {UserModel} = require('user.model');
const {BookModel} = require('book.model');

Model.knex(knex);

class ListModel extends Model{
    static get tableName(){
        return 'lists';
    }

    static get jsonSchema(){
        return {
            type: 'object',
            properties:{
                ID_user: {type: 'integer'},
                ID_book: {type: 'integer'}
            }
        }
    }

    static relationMappings = {
        users: {
            relation: Model.BelongsToOneRelation,
            modelClass: UserModel,
            join: {
                from: 'lists.ID_user',
                to: 'users.ID_user'
            }
        },
        books: {
            relation: Model.BelongsToOneRelation,
            modelClass: BookModel,
            join: {
                from: 'lists.ID_book',
                to: 'books.ID_book'
            }
        }
    }
}

module.exports = ListModel;