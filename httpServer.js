
const http = require('http');
const hostname = '54.159.13.68';
const port = 8080;


var connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'root',
   database: 'codify',
   port:     '8889'     
})

connection.connect();

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });