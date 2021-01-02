
exports.up = function(knex) {
    return knex.schema.createTable('lists',(table) => {
        table.integer('ID_book',10).unsigned().notNullable().index()
            .references('ID_book').inTable('books');
        table.integer('ID_user',10).unsigned().notNullable().index()
            .references('ID_user').inTable('users');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('lists');
};
