
exports.up = function(knex, Promise) {
  return knex.schema.table('wombles', function (table) {
    table.integer('rubbish_id').notNull().defaultTo(2)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('wombles', function (table) {
    table.dropColumn('rubbish_id')
  })
};
