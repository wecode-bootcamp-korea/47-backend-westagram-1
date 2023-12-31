-- migrate:up
CREATE TABLE comments(
    id INT NOT NULL AUT0_INCREMENT,
    content VARCHAR(3000) NULL,
    user_id INT NOT NULL ,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id));    

-- migrate:down

