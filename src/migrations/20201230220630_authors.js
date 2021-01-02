
exports.up = function(knex) {
    return knex.schema.createTable('authors', (table) => {
        table.increments('ID_author').primary();
        table.string('name', 50).notNullable();
        table.string('surname', 50).notNullable();
        table.string('info', 200).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('authors');
};
