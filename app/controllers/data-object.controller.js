const DataObject = require("../models/data-object.model");
const Level = require("../models/level.model");

exports.create = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    const dataObject = new DataObject({
      name: req.body.name,
    });
   
    await DataObject.create(
      dataObject,
      async (err, newObject) => {
        if (err) {
         throw new Error(err);
        } else {
          for await (const level of req.body.levels) {
            await Level.create(
              { ...level, dataObjectId: newObject.id },
              (err, newLevel) => {
                if (err) {
                  throw new Error(err);
                }
              }
            );
          }
          res.send(true).end()
        }
      }
    );
  } catch (err) {
    res.status(500).send({
      message:
        e.message || "Some error occurred while creating the DataObject.",
    }).end();
  }
};

exports.getAll = (_, res) => {

  DataObject.getAll({}, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving data objects."
      });
    else res.send(data);
  });
};

exports.findById = (req, res) => {
  DataObject.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found data object with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving data object with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.softDelete = (req, res) => {
  DataObject.softDelete(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found data object with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete data object with id " + req.params.id
        });
      }
    } else res.send({ message: `Data object was deleted successfully!` });
  });
};

