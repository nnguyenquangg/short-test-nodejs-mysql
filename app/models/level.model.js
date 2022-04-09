module.exports = (sequelize, DataTypes) => {
  const Level = sequelize.define(
    "Level",
    {
      levelID: {
        type: DataTypes.INTEGER,
      },
      levelName: {
        type: DataTypes.STRING,
      },
      elements: DataTypes.JSON,
    },
    {
      sequelize,
      paranoid: true,
      deletedAt: "deletedAt",
    }
  );
  return Level;
};
