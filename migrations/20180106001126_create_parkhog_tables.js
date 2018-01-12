exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('licensePlates', function (table) {
            table.string('plate').primary();
          }),
        knex.schema.createTable('reports', function (table) {
            table.increments('id').primary();
            table.string('description');
            table.binary('photo'); 
            table.date('date');
            table.double('latitude');
            table.double('longitude');
          })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('reports'),
        knex.schema.dropTable('licensePlates')
    ]);
};

