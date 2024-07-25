CREATE TABLE USER (
    username VARCHAR(50) unique not null,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) unique NOT NULL,
    password VARCHAR(255) NOT NULL,
    primary key(username)
);


CREATE TABLE jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  company VARCHAR(255) NOT NULL
);
