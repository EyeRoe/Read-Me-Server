
exports.up = function(knex, Promise) {
  return knex.schema.createTable('readinglist', table => {
    table.increments()
    table.string('title').notNullable()
    table.string('authors').notNullable()
    table.string('thumbnail').notNullable()
    table.string('description').notNullable()
    table.string('link').notNullable()
    table.integer('users_id')
    table.foreign('users_id').references('users.id')
  })

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('readinglist')

};
