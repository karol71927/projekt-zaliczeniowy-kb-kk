const {Model} = require('objection')  //zmapowanie z sql
const knex = require('../knex')
const {ReviewModel} = require('review.model')
const {PublisherModel} = require('publisher.model')
const {GenreModel} = require('genre.model')
const {ListModel} = require('list.model')
const {AuthorModel} = require('author.model')

Model.knex(knex);   //okreslamy, ze model ma knex i ma zapytania

class BookModel extends Model{
    static get tableName(){ //zmapowanie z sql na js
        return 'books';
    }

    static get jsonSchema(){
        return{
            type: 'object',
            properties: {
                ID_book: {type: 'integer'},
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

    static relationMappings = {
        reviews: {
            relation: Model.HasManyRelation,
            modelClass: ReviewModel,
            join: {
                from: 'books.ID_book',
                to: 'reviews.ID_book'
            }
        },
        publishers: {
            relation: Model.BelongsToOneRelation,
            modelClass: PublisherModel,
            join: {
                from: 'books.ID_publisher',
                to: 'publishers.ID_publisher'
            }
        },
        genres: {
            relation: Model.BelongsToOneRelation,
            modelClass: GenreModel,
            join: {
                from: 'books.ID_genre',
                to: 'genres.ID_genre'
            }
        },
        lists: {
            relation: Model.HasManyRelation,
            modelClass: ListModel,
            join: {
                from: 'books.ID_book',
                to: 'lists.ID_book'
            }
        },
        authors: {
            relation: Model.BelongsToOneRelation,
            modelClass: AuthorModel,
            join: {
                from: 'books.ID_author',
                to: 'authors.ID_author'
            }
        }
    }
}

module.exports = BookModel;