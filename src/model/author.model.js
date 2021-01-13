const {Model} = require('objection')
const knex = require('../knex')

Model.knex(knex);

class AuthorModel extends Model {
    static get tableName(){
        return 'authors';
    }

    static get idColumn(){
        return 'ID_author';
    }

    static get jsonSchema(){
        return{
            type: 'object',
            properties: {
                name: {type: 'string'},
                surname: {type: 'string'},
                info: {type: 'string'}
            },
            required: ['name', 'surname', 'info']
        }
    }

    static get relationMappings() {
        return {
            books: {
                relation: Model.HasManyRelation,
                modelClass: require('./book.model'),
                join: {
                    from: 'authors.ID_author',
                    to: 'books.ID_author'
                }
            },
            publishers: {
                relation: Model.ManyToManyRelation,
                modelClass: require('./publisher.model'),
                join: {
                    from: 'authors.ID_author',
                    through: {
                        from: 'books.ID_author',
                        to: 'books.ID_publisher'
                    },
                    to: 'publishers.ID_publisher'
                }
            }
        }
    }
}

module.exports = AuthorModel;
