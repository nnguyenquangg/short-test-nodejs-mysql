module.exports = {
  up: `CREATE TABLE IF NOT EXISTS DataObjects (
        id INT(100) NOT NULL  AUTO_INCREMENT PRIMARY KEY,
        isDeleted boolean default false,
        name VARCHAR(30) NOT NULL,
        createdAt datetime DEFAULT NULL COMMENT 'created time',
        updatedAt datetime DEFAULT NULL COMMENT 'updated time',
        deletedAt datetime
      )`,
  down: "",
};
