const {Model} = require('objection');
const knex = require('../knex');

Model.knex(knex);

class LogModel extends Model{
    static get tableName(){
        return 'logs';
    }

    static get idColumn(){
        return 'ID_log';
    }

    $beforeInsert(queryContext) {
        const date = new Date();
        date.setUTCHours(date.getHours());
        this.createdAt = date.toISOString();
    }

    static get jsonSchema(){
        return{
            type: 'object',
            properties: {
                description: {type: 'string'},
                code: {type: 'string'},
                createdAt: {type: 'date'}
            }
        }
    }
}
function createDateAsUTC(date) {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
}

function convertDateToUTC(date) {
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
}
module.exports = LogModel;