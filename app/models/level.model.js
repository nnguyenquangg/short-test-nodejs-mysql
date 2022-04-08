const sql = require("./db.js");

const Level = function (level) {
  this.levelID = level.levelID;
  this.levelName = level.levelName;
  this.elements = level.elements;
  this.dataObjectId = level.dataObjectId;
};

Level.create = (newLevel, result) => {
  sql.query(
    "INSERT INTO Level SET ?",
    { ...newLevel, elements: JSON.stringify(newLevel.elements) },
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, { id: res.insertId, ...newLevel });
    }
  );
};

module.exports = Level;
