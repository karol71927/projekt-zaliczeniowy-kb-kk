const {Model} = require('objection')
const knex = require('../knex')
const {BookModel} = require('book.model')

Model.knex(knex);

class PublisherModel extends Model{
    static get tableName(){
        return 'publishers'
    }

    static get jsonSchema(){
        return{
            type: 'object',
            properties: {
                ID_publisher: {type: 'integer'},
                name: {type: 'string'}
            }
        }
    }

    static RelationMappings = {
        books: {
            relation: Model.HasManyRelation,
            modelClass: BookModel,
            join: {
                from: 'publishers.ID_publisher',
                to: 'books.ID_publisher'
            }
        }
    }
}

module.exports = PublisherModel;