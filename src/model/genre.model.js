const {Model} = require('objection');
const knex = require('../knex');

Model.knex(knex);

class GenreModel extends Model{
    static get tableName(){
        return 'genres';
    }

    static get idColumn(){
        return 'ID_genre';
    }

    static get jsonSchema(){
        return {
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
                    from: 'genres.ID_genre',
                    to: 'books.ID_genre'
                }
            },
            authors: {
                relation: Model.ManyToManyRelation,
                modelClass: require('./author.model'),
                join: {
                    from: 'genres.ID_genre',
                    through:{
                        from: 'books.ID_genre',
                        to: 'books.ID_author'
                    },
                    to: 'authors.ID_author'
                }
            }
        }
    }
}

module.exports = GenreModel;