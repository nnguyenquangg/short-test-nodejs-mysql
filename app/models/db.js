const mysql = require("mysql");
var migration = require("mysql-migrations");
const Sequelize = require("sequelize");

const connection = mysql.createPool({
  host: "localhost",
  user: "test",
  password: "test",
  database: "db",
  typeCast: function (field, next) {
    if (field.type === "JSON") {
      return JSON.parse(field.string());
    } else {
      return next();
    }
  },
});

migration.init(connection, __dirname + "/migrations", function () {
  console.log("finished running migrations");
});

const sequelize = new Sequelize("db", "test", "test", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 100000,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.DataObject = require("./data-object.model.js")(sequelize, Sequelize);
db.Level = require("./level.model.js")(sequelize, Sequelize);
db.DataObject.hasMany(db.Level, { as: "levels" });
db.Level.belongsTo(db.Level, {
  foreignKey: "dataObjectId",
  as: "DataObject",
});
module.exports = db;
