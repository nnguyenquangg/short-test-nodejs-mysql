module.exports = {
  up: `CREATE TABLE IF NOT EXISTS Level (
        id INT(100) NOT NULL  AUTO_INCREMENT PRIMARY KEY,
        levelID INT(100) NOT NULL,
        levelName VARCHAR(255) NOT NULL,
        elements json,
        dataObjectId int(100),
        isDeleted boolean default false,
        FOREIGN KEY(dataObjectId) REFERENCES DataObject(id)
    )`,
  down: "",
};
