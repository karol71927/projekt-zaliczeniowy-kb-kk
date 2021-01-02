
exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('ID_user').primary();
        table.string('nickname', 20).notNullable();
        table.string('login', 20).notNullable().unique();
        table.string('password', 100).notNullable();
        table.string('status', 10).notNullable();
        table.string('email',50).notNullable().unique();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};