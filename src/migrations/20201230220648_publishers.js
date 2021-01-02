
exports.up = function(knex) {
    return knex.schema.createTable('publishers', (table) => {
        table.increments('ID_publisher').primary();
        table.string('name', 50).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('publishers');
};