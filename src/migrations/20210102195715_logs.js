
exports.up = function(knex) {
    return knex.schema.createTable('logs',(table) => {
        table.increments('ID_log').primary();
        table.string('description').notNullable();
        table.string('code',5).notNullable();
        table.dateTime('createdAt').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('logs');
};
