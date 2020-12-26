const {Model} = require('objection')
const knex = require('../knex')
const {ListModel} = require('list.model')
const {ReviewModel} = require('review.model')

Model.knex(knex);

class UserModel extends Model{
    static get tableName(){
        return 'users'
    }

    static get jsonSchema(){
        return{
            type: 'object',
            properties: {
                ID_user: {type: 'integer'},
                nickname: {type: 'string'},
                login: {type: 'string'},
                password: {type: 'string'},
                status: {type: 'string'},
                email: {type: 'string'}
            }
        }
    }

    static relationMappings = {
        lists: {
            relation: Model.HasManyRelation,
            modelClass: ListModel,
            join: {
                from: 'users.ID_user',
                to: 'lists.ID_user'
            }
        },
        reviews: {
            relation: Model.HasManyRelation,
            modelClass: ReviewModel,
            join: {
                from: 'users.ID_user',
                to: 'reviews.ID_user'
            }
        }
    }
}

module.exports = UserModel;