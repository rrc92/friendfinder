DROP DATABASE friends_db;
CREATE DATABASE friends_db;

/* this is how i connect to a database*/
USE friends_db;

CREATE TABLE friends (
    id INT NOT NULL AUTO_INCREMENT, 
    nam VARCHAR(255),
    PRIMARY KEY(id) 
);

CREATE TABLE questions (
    id INT NOT NULL AUTO_INCREMENT, 
    ques VARCHAR(255),
    PRIMARY KEY(id)
);

CREATE TABLE scores (
    id INT NOT NULL AUTO_INCREMENT,
    question_id INT NOT NULL,
    friend_id INT NOT NULL,
    answer INT NOT NULL,
    FOREIGN KEY (question_id) REFERENCES questions(id),
    FOREIGN KEY (friend_id) REFERENCES friends(id),
    PRIMARY KEY (id),
    CHECK (answer >= 0),
    CHECK (answer <= 10)
);