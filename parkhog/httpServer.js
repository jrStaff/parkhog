
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const mysql_endpoint = "parkhog-db.cnumdaywuucj.us-east-1.rds.amazonaws.com";
const hostname = '54.174.167.3'; 
const port = 80;

var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: mysql_endpoint,
        user: 'jstaff',
        password: 'Alba!#78',
        database: 'reports',
        port:     '3306'     
    },
    pool: { min: 0, max: 5 }
  });
  
  app.use(express.static('public'));
  app.use(bodyParser.json());

  app.post('/createReport', (req, res) => {
    knex('books').insert({
      licensePlate: req.body.licensePlate,
      description: req.body.description,
      photo: req.body.photo,
      date: req.body.date,
      latitude: req.body.latitude,
      longitude: req.body.longitude
    }).then(() => res.sendStatus(200));
  });

  app.listen(80, () => {
    console.log('Server running on http://' + hostname + ':' + port);
  });