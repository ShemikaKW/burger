//Import MySQL connection
var connection = require('./connection.js');

//Helper function for SQL syntax
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push('?');
    }

    return arr.toString();
}

//Helper fuction to convert object key/value pair to SQL syntax
function objToSql(ob) {
    var arr = [];

    //loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Veggie Burger => 'Veggie Burger')
            if (typeof value === 'string' && value.indexOf (' ') >= 0) {
                value = "'" + value + "'";
            }
            //e.g. {name: 'Veggie Burger'} => ["name = 'Veggie Burger'"]

            arr.push(key + "=" + value);
        }
    }

    //translate array of strings to a single comma-separated string
    return arr.toString();
}

//Object for all our SQL statement functions.
var orm = {
    all: function(tableInput, callback) {
        //console.log('ORM', tableInput, callback);
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            //console.log("result", result);
            callback(result);
        });
    },
    create: function(table, cols, vals, callback) {
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ")";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function(err, result) {
            if (err) {
                throw err;
            }
            console.log("Testing: ", query.sql);
            callback(result);
        });
    },

    update: function(table, objColVals, condition, callback) {
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }

            callback(result);
        });
    }
};

//Export the orm object for the model (burger.js)
module.exports = orm;