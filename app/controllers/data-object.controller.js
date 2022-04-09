const Op = require("sequelize").Op;
const { keyBy } = require("lodash");
const db = require("./../models/db");
const { DataObject, Level } = db;

exports.create = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    const newDataObject = await DataObject.create({
      name: req.body.name,
    });

    for (const level of req.body.levels) {
      await Level.create({
        ...level,
        dataObjectId: newDataObject.dataValues.id,
      });
    }

    res.send(newDataObject);
  } catch (err) {
    res
      .status(500)
      .send({
        message:
          err.message || "Some error occurred while creating the DataObject.",
      })
      .end();
  }
};

exports.getAll = async (_, res) => {
  try {
    const dataObjects = await DataObject.findAll({ include: ["levels"] });
    res.send(dataObjects);
  } catch (err) {
    res
      .status(500)
      .send({
        message:
          err.message || "Some error occurred while query all DataObject.",
      })
      .end();
  }
};

exports.findById = async (req, res) => {
  try {
    const dataObject = await DataObject.findByPk(req.params.id, {
      include: ["levels"],
    });

    if (!dataObject) {
      res.status(404).send("Not found");
      return;
    }

    res.send(dataObject);
  } catch (err) {
    res
      .status(500)
      .send({
        message:
          err.message || "Some error occurred while query the DataObject.",
      })
      .end();
  }
};

exports.softDelete = async (req, res) => {
  try {
    await DataObject.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.sendStatus(200);
  } catch (err) {
    res
      .status(500)
      .send({
        message:
          err.message || "Some error occurred while query the DataObject.",
      })
      .end();
  }
};

exports.setParentLink = async (req, res) => {
  try {
    const dataObject = await DataObject.findOne({
      where: { id: req.params.id },
    });

    if (!dataObject) {
      res.status(404).send("Data Object Not found");
      return;
    }

    const { body } = req;

    if (body.parentId === body.childrenId) {
      res.status(400).send("Parent Level and Children Level should different");
      return;
    }

    const levels = await Level.findAll({
      where: {
        dataObjectId: dataObject.id,
        id: {
          [Op.in]: [body.parentId, body.childrenId],
        },
      },
    });

    if (levels.length !== 2) {
      res
        .status(400)
        .send("ParentId or ChildrenId is not belong to DataObject");
      return;
    }

    const levelMapped = keyBy(levels, "id");

    await Level.update(
      {
        parentId: body.parentId,
      },
      { where: { id: body.childrenId } }
    );

    if (levelMapped[body.parentId].parentId === body.childrenId) {
      await Level.update(
        {
          parentId: null,
        },
        { where: { id: body.parentId } }
      );
    }

    const result = await DataObject.findByPk(req.params.id, {
      include: ["levels"],
    });

    res.send(result);
  } catch (err) {
    res
      .status(500)
      .send({
        message:
          err.message || "Some error occurred while query the DataObject.",
      })
      .end();
  }
};
