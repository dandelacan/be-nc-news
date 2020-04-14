
exports.up = function (knex) {
    console.log('creating articles table...');
    return knex.schema.createTable('articles', articleTable => {
        articleTable.increments('article_id').primary();
        articleTable.text('title').notNullable();
        articleTable.text('body').notNullable();
        articleTable.integer('votes').defaultsTo(0);
        articleTable.text('topic').references('topics.slug');
        articleTable.text('author').references('users.username').notNullable();
        articleTable.timestamp('created_at').defaultsTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    console.log('removing articles table...');
    return knex.schema.dropTable('articles')
};
