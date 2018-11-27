// Import the ORM
var orm = require('../config/orm.js');

var burger = {
    all: function (callback) {
        orm.all('burgers', function (res) {
            callback(res);
        });

    },
    devoured: function (vals, cb) {
        orm.devoured("eat-da-burger", [
            "burger_name", "devoured"
        ], [vals, false], cb);
    },
    update: function (devoured, id, cb) {
        var condition = "id=" + id;
        orm.update("burgers", {
            devoured: devoured
        }, condition, cb);
    },
   
    create: function (vals, callback) {
        orm.create('burgers', [
            'burger_name', 'devoured'
        ], [vals, false], callback);
    },

    update: function (create, id, callback) {
        var condition = "id=" + id;
        orm.update('burgers', {
            devoured: true,
        }, condition, callback);
    },
}

//Export the db handling functions to the controller
module.exports = burger;