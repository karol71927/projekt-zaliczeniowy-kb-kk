const {Model} = require('objection')
const knex = require('../knex')
const {BookModel} = require('book.model')

Model.knex(knex);

class AuthorModel extends Model{
    static get tableName(){
        return 'authors';
    }

    static get jsonSchema(){
        return{
            type: 'object',
            properties: {
                ID_author: {type: 'integer'},
                name: {type: 'string'},
                surname: {type: 'string'},
                info: {type: 'string'}
            }
        }
    }

    static RelationMappings = {
        books: {
            relation: Model.HasManyRelation,
            modelClass: BookModel,
            join: {
                from: 'authors.ID_author',
                to: 'books.ID_author'
            }
        }
    }
}

module.exports = AuthorModel;
