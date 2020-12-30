const {Model} = require('objection')
const knex = require('../knex')
const argon2 = require('argon2')

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
                password: {
                    type: 'string',
                    minLength: 6,
                    maxLength: 20
                },
                status: {
                    type: 'string',
                    enum: ['user','admin']
                },
                email: {type: 'string'}
            }
        }
    }

    async $beforeInsert(context) {
        await super.$beforeInsert(context)

        return this.generateHash()
    }

    async $beforeUpdate(options, context) {
        await super.$beforeUpdate(options, context)

        if (options.patch) {
            return false
        }

        return this.generateHash()
    }

    async generateHash() {
        const hash = await argon2.hash(this.password,{type: argon2.argon2id})
        this.password = hash
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

module.exports = UserModel