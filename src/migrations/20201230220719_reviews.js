
exports.up = function(knex) {
    return knex.schema.createTable('reviews',(table) => {
        table.increments('ID_review').primary();
        table.integer('ID_book',10).unsigned().notNullable().index()
            .references('ID_book').inTable('books');
        table.integer('ID_user',10).unsigned().notNullable().index()
            .references('ID_user').inTable('users');
        table.string('contents',1000).nullable();
        table.date('date').notNullable();
        table.integer('rate',2).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('reviews')
};
