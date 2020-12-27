const {Model} = require('objection')
const knex = require('../knex')

Model.knex(knex);

class UserModel extends Model{
    static get tableName(){
        return 'users'
    }

    static get idColumn(){
        return 'ID_user';
    }

    static get jsonSchema(){
        return{
            type: 'object',
            properties: {
                nickname: {type: 'string'},
                login: {type: 'string'},
                password: {type: 'string'},
                status: {type: 'string'},
                email: {type: 'string'}
            }
        }
    }

    static get relationMappings() {
        return {
            lists: {
                relation: Model.HasManyRelation,
                modelClass: require('./list.model'),
                join: {
                    from: 'users.ID_user',
                    to: 'lists.ID_user'
                }
            },
            reviews: {
                relation: Model.HasManyRelation,
                modelClass: require('./review.model'),
                join: {
                    from: 'users.ID_user',
                    to: 'reviews.ID_user'
                }
            }
        }
    }
}

module.exports = UserModel;

