
exports.up = function(knex) {
    return knex.schema.createTable('genres',(table) => {
        table.increments('ID_genre').primary();
        table.string('name',50).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('genres')
};
