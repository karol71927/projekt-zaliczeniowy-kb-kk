const {Model} = require('objection')  //zmapowanie z sql
const knex = require('../knex')

Model.knex(knex);   //okreslamy, ze model ma knex i ma zapytania

class BookModel extends Model{
    static get tableName(){ //zmapowanie z sql na js
        return 'books';
    }

    static get idColumn(){
        return 'ID_book';
    }

    static get jsonSchema(){
        return{
            type: 'object',
            properties: {
                title: {type: 'string'},
                description: {type: 'string'},
                pages: {type: 'integer'},
                ID_publisher: {type: 'integer'},
                ID_genre: {type: 'integer'},
                releaseDate: {type: 'date'},
                ID_author: {type: 'integer'}
            }
        }
    }

    static get relationMappings() {
        return {
            reviews: {
                relation: Model.HasManyRelation,
                modelClass: require('./review.model'),
                join: {
                    from: 'books.ID_book',
                    to: 'reviews.ID_book'
                }
            },
            publishers: {
                relation: Model.BelongsToOneRelation,
                modelClass: require('./publisher.model'),
                join: {
                    from: 'books.ID_publisher',
                    to: 'publishers.ID_publisher'
                }
            },
            genres: {
                relation: Model.BelongsToOneRelation,
                modelClass: require('./genre.model'),
                join: {
                    from: 'books.ID_genre',
                    to: 'genres.ID_genre'
                }
            },
            lists: {
                relation: Model.HasManyRelation,
                modelClass: require('./list.model'),
                join: {
                    from: 'books.ID_book',
                    to: 'lists.ID_book'
                }
            },
            authors: {
                relation: Model.BelongsToOneRelation,
                modelClass: require('./author.model'),
                join: {
                    from: 'books.ID_author',
                    to: 'authors.ID_author'
                }
            }
        }
    }
}

module.exports = BookModel;