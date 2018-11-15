var express = require('express');

var app = express();

//Set Port
var PORT = process.env.PORT || 8080;

//Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());


//Handlebars setup
var exphbs = require('express-handlebars');

 app.engine('handlebars', exphbs({ defaultLayout: "main" }));
 app.set('view engine', 'handlebars');

 var mysql = require('mysql');

 var connection = mysql.createConnection({
     host: 'localhost',
     port: 8080,
     user: 'root',
     password: 'Charityandgary2',
     database: 'burgers-db'
 });

 connection.connect(function(err) {
     if(err) {
         console.error('Error connecting: ' + err.stack);
         return;
     }
        console.log('Connected as id ' + connection.threadId);
 });

 //Starts server so that it can begin listening to client request.
 app.listen(PORT, function() {
     // Logs when server has started
     console.log('Server listening on: http//Localhost: ' + PORT);
     
 });

