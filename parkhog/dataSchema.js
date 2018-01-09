const mysql_endpoint = "parkhog-db.cnumdaywuucj.us-east-1.rds.amazonaws.com";


var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: mysql_endpoint,
        user: 'jstaff',
        password: 'Alba!#78',
        database: 'parkhog',
        port:     '3306'     
    }
  });

var result = knex.schema.createTable('reports', function (table) {
    table.string('number').primary();
  });

console.log(result);

result = knex.schema.createTable('licensePlates', function (table) {
    table.increments('id').primary();
    table.foreign('number').references('reports.number');
    table.string('description');
    table.raw('photo'); 
    table.date('date');
    table.double('latitude');
    table.double('longitude');
  });
