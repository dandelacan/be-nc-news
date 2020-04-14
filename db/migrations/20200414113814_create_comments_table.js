
exports.up = function (knex) {
    // console.log('creating comments table...');
    return knex.schema.createTable('comments', commentTable => {
        commentTable.increments('comment_id').primary();
        commentTable.text('author').references('users.username').notNullable();
        commentTable.integer('article_id').references('articles.article_id').notNullable();
        commentTable.integer('votes').defaultsTo(0);
        commentTable.timestamp('created_at').defaultsTo(knex.fn.now());
        commentTable.text('body').notNullable();
    })
};

exports.down = function(knex) {
    // console.log('removing comments table...');
    return knex.schema.dropTable('comments')
};
