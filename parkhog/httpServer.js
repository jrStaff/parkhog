
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const mysql_endpoint = "parkhog-db.cnumdaywuucj.us-east-1.rds.amazonaws.com";
const hostname = '54.174.167.3'; 
const port = 8080;
const knex = require('knex')({
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
    licensePlateExists(req.body.plate)
    .then(function(result){
      if(!result){
        insertLicensePlate(req, res);
      }
    })
    .then(insertReport(req, res)
    .then(() => res.sendStatus(200)))
    .catch(function(error){
      handleError(error, res);
    });
  }); 

  app.get('/reports/:plate', (req, res) => {
    knex.select().table('reports').where('plate', req.params.plate)
    .then(function(collection){
      res.json({
        error:false,
        data: collection
      })
    })
    .catch(function(error){
      handleError(error, res);
    });
  });

var insertReport = function(req, res){  
  return knex('reports').insert({
    plate: req.body.plate,
    description: req.body.description,
    photo: req.body.photo,
    date: req.body.date,
    latitude: req.body.latitude,
    longitude: req.body.longitude
  });
}

var insertLicensePlate = function(req, res){
  return knex('licensePlates').returning('plate').insert({
    plate: req.body.plate
  });
}

var licensePlateExists = function(licensePlate){
  return knex.select('plate').from('licensePlates').where('plate', licensePlate).then(function(result){
    if(result[0] == null || result[0].plate == null){
      return false;
    } else{
      return true;
    }
  });
}

var handleError = function(error, res){
  console.log(error.message);
  res.status(500).json({
    error: true,
    data: {
      message:err.message
    }
  });
}


app.listen(port, () => {
  console.log('Server running on http://' + hostname + ':' + port);
});
