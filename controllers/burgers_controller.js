var express = require('express');
var router = express.Router();

//Import the model (burger.js) to use its database functions.
var burger = require('../models/burger.js');

//Create all routes and set up logic within the routes
router.get ('/', function(req, res) {
    
    burger.all(function(data) {
        var hbsObject = {
            burgers: data
        };
       // console.log('object', hbsObject);
        res.render('index', hbsObject);
    });
});

router.post('/burger/create', function(req, res) {
    burger.create(req.body.burgers, function () {
       res.status(200).end(); 
    });
});

router.put('/burger/update/:id', function(req, res) {
    burger.update(req.body.devoured, req.params.id, function () {
        res.status(200).end(); 
    });
});

router.delete('/burger/delete/:id', function(req, res) {
    var condition = 'id = ' + req.params.id;

    burger.delete(condition, function() {
        res.redirect('/');
    });

router.put('/burger/update/:id', function(req, res) {
    burger.update(req.body.create, req.params.id, function () {
        res.status(200).end();
    })
});
});

//Exports routes for server.js to use
module.exports = router;