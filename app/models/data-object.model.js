module.exports = (sequelize, DataTypes) => {
  const DataObject = sequelize.define(
    "DataObject",
    {
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      paranoid: true,
      deletedAt: "deletedAt",
    }
  );
  return DataObject;
};
