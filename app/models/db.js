const mysql = require("mysql");
var migration = require('mysql-migrations');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'test',
  password: 'test',
  database: 'db',
  typeCast: function (field, next) {
    if (field.type === "JSON") {
      return JSON.parse(field.string());
    } else {
      return next();
    }
  },
});

migration.init(connection, __dirname + '/migrations', function() {
  console.log("finished running migrations");
});

module.exports = connection;
