const {Model} = require('objection')
const knex = require('../knex')

Model.knex(knex);

class PublisherModel extends Model{
    static get tableName(){
        return 'publishers'
    }

    static get idColumn(){
        return 'ID_publisher';
    }

    static get jsonSchema(){
        return{
            type: 'object',
            properties: {
                name: {type: 'string'}
            },
            required: ['name']
        }
    }

    static get relationMappings() {
        return {
            books: {
                relation: Model.HasManyRelation,
                modelClass: require('./book.model'),
                join: {
                    from: 'publishers.ID_publisher',
                    to: 'books.ID_publisher'
                }
            },
            authors: {
                relation: Model.ManyToManyRelation,
                modelClass: require('./author.model'),
                join: {
                    from: 'publishers.ID_publisher',
                    through: {
                        from: 'books.ID_publisher',
                        to: 'books.ID_author'
                    },
                    to: 'authors.ID_author'
                }
            }
        }
    }
}

module.exports = PublisherModel;