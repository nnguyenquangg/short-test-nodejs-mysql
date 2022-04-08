CREATE TABLE IF NOT EXISTS DataObject (
  id INT(100) NOT NULL  AUTO_INCREMENT PRIMARY KEY,
  isDeleted boolean default false,
  name VARCHAR(30) NOT NULL
)