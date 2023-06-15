-- migrate:up
CREATE TABLE posts(
    id INT NOT NULL AUT0_INCREMENT,
    title VARCHAR(100) NOT NULL,
    content VARCHAR(3000) NULL,
    user_id INT NOT NULL ,
   
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id));
    


-- migrate:down

