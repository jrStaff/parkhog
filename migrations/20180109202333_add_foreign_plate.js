
exports.up = function(knex, Promise) {
    return knex.schema.table('reports', function(table) {
        table.string('plate');
        table.foreign('plate').references('plate').inTable('licensePlates');
    });
};

exports.down = function(knex, Promise) {
    return  table.dropColumn('plate');
};
