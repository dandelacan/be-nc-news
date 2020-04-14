
exports.up = function(knex) {
    console.log('creating users table...');
    return knex.schema.createTable('users', userTable => {
        userTable.text('username').primary();
        userTable.text('avatar_url');
        userTable.text('name').notNullable();
    })
};

exports.down = function(knex) {
    console.log('removing users table...');
    return knex.schema.dropTable('users')
};
