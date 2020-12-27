const {Model} = require('objection');
const knex = require('../knex');

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
    static get relationMappings() {
        return {
            users: {
                relation: Model.BelongsToOneRelation,
                modelClass: require('./user.model'),
                join: {
                    from: 'lists.ID_user',
                    to: 'users.ID_user'
                }
            },
            books: {
                relation: Model.BelongsToOneRelation,
                modelClass: require('./book.model'),
                join: {
                    from: 'lists.ID_book',
                    to: 'books.ID_book'
                }
            }
        }
    }
}

module.exports = ListModel;