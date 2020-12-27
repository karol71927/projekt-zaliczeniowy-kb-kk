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
            }
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
            }
        }
    }
}

module.exports = GenreModel;