module.exports = (app) => {
  const dataObject = require("../controllers/data-object.controller.js");

  const router = require("express").Router();

  router.get("", dataObject.getAll);
  router.post("/", dataObject.create);
  router.get("/:id", dataObject.findById);
  router.delete("/:id", dataObject.softDelete);
  router.put('/set-parent/:id', dataObject.setParentLink);

  app.use("/api/data-objects", router);
};
