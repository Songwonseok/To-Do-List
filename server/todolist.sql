CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(64) NOT NULL,
    password VARCHAR(64) NOT NULL,
    name VARCHAR(64) NOT NULL,
    phone VARCHAR(20) NOT NULL
    );


CREATE TABLE Board (
	id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(64),
    user_id INT NOT NULL,
    head INT DEFAULT NULL,
    FOREIGN KEY(user_id) REFERENCES Users(id) ON DELETE cascade
    );

CREATE TABLE Card (
	id INT PRIMARY KEY AUTO_INCREMENT,
    board_id INT NOT NULL,
    content varchar(300) NOT NULL,
    next_card INT DEFAULT NULL,
    addedBy INT NOT NULL,
    FOREIGN KEY(board_id) REFERENCES Board(id) ON DELETE cascade,
    FOREIGN KEY(next_card) REFERENCES Card(id),
    FOREIGN KEY(addedBy) REFERENCES Users(id)
    );

ALTER TABLE Board ADD CONSTRAINT Head_card FOREIGN KEY(head) REFERENCES Card(id);

CREATE TABLE Log (
	id INT PRIMARY KEY AUTO_INCREMENT,
    action VARCHAR(64),
    user_id INT NOT NULL,
    subject varchar(300) NOT NULL,
    from_list INT,
    to_list INT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    