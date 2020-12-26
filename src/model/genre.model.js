const {Model} = require('objection');
const knex = require('../knex');
const {BookModel} = require('book.model')

Model.knex(knex);

class GenreModel extends Model{
    static get tableName(){
        return 'genres';
    }

    static get jsonSchema(){
        return {
            type: 'object',
            properties: {
                ID_genre: {type: 'integer'},
                name: {type: 'string'}
            }
        }
    }

    static relationMappings = {
        books: {
            relation: Model.HasManyRelation,
            modelClass: BookModel,
            join: {
                from: 'genres.ID_genre',
                to: 'books.ID_genre'
            }
        }
    }
}

module.exports = GenreModel;