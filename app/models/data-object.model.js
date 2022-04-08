const sql = require("./db.js");

const DataObject = function (dataObject) {
  this.name = dataObject.name;
};

DataObject.create = (newObject, result) => {
  sql.query("INSERT INTO DataObject SET ? ", newObject, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newObject });
  });
};

DataObject.getAll = (_, result) => {
  sql.query(
    `SELECT do.id, name, levelName, levelID, elements FROM DataObject do LEFT JOIN Level l ON do.id  = l.dataObjectId where  do.isDeleted = false;`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      result(null, res);
    }
  );
};

DataObject.findById = (id, result) => {
  sql.query(
    `SELECT do.id, name, levelName, levelID, elements FROM DataObject do LEFT JOIN Level l ON do.id  = l.dataObjectId  WHERE do.id = ${id} and do.isDeleted = 0`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
};

DataObject.softDelete  = (id, result) => {
  sql.query(`UPDATE DataObject set isDeleted = true WHERE id = ${id}`, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, res);
  });
};

module.exports = DataObject;
