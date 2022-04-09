CREATE TABLE IF NOT EXISTS Levels (
        id INT(100) NOT NULL  AUTO_INCREMENT PRIMARY KEY,
        levelID INT(100) NOT NULL,
        levelName VARCHAR(255) NOT NULL,
        elements json,
        dataObjectId int(100),
        isDeleted boolean default false,
        parentId int(100),
        createdAt datetime DEFAULT NULL COMMENT 'created time',
        updatedAt datetime DEFAULT NULL COMMENT 'updated time',
        deletedAt datetime,
        FOREIGN KEY(dataObjectId) REFERENCES DataObjects(id)
    )