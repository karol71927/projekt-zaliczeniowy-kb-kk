
exports.up = function(knex) {
    return knex.schema.createTable('books',(table) => {
        table.increments('ID_book').primary().unsigned();
        table.string('title',50).notNullable();
        table.string('description',200).notNullable();
        table.integer('pages',10).notNullable();
        table.integer('ID_publisher',10).unsigned().notNullable().index()
            .references('ID_publisher').inTable('publishers');
        table.integer('ID_genre',10).unsigned().notNullable().index()
            .references('ID_genre').inTable('genres');
        table.date('releaseDate').notNullable();
        table.integer('ID_author',10).unsigned().notNullable().index()
            .references('ID_author').inTable('authors');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('books');
};
