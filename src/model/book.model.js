const {Model} = require('objection')  //zmapowanie z sql
const knex = require('../knex')

Model.knex(knex);   //okreslamy, ze model ma knex i ma zapytania

class BookModel extends Model{
    static get tablename(){ //zmapowanie z sql na js
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
}

module.exports = BookModel;