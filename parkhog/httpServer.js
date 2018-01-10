
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const mysql_endpoint = "parkhog-db.cnumdaywuucj.us-east-1.rds.amazonaws.com";
const hostname = '54.174.167.3'; 
const port = 8080;

var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: mysql_endpoint,
        user: 'jstaff',
        password: 'Alba!#78',
        database: 'parkhog',
        port:     '3306'     
    },
    pool: { min: 1, max: 5 }
  });
  
  app.use(express.static('public'));
  app.use(bodyParser.json());

  app.post('/create_report', (req, res) => {
    console.log("Attempting insert");
    insertLicensePlate(req, res);
    insertReport(req, res);
  });





var insertReport = function(req, res){
  knex('reports').insert({
    plate: req.body.plate,
    description: req.body.description,
    photo: req.body.photo,
    date: req.body.date,
    latitude: req.body.latitude,
    longitude: req.body.longitude
  }).then(() => res.sendStatus(200));
}

var insert = {
  plate: 'VHX-4567-TX',
  description: "I am a car parked horribly",
  photo: null,
  date: null,
  latitude: 20.1,
  longitude: 128.0
};

var insertLicensePlate = function(req, res){
  knex('licensePlates').insert({
    plate: req.body.plate
  });
}

var licensePlateExists = function(licensePlate){
  var result = knex.select(licensePlate).from('licensePlates').limit(1);
  return false;
}





  app.listen(port, () => {
    console.log('Server running on http://' + hostname + ':' + port);
  });