-- migrate:up
CREATE TABLE likes(
    id INT NOT NULL auto_increment,
    user_id INT NOT NULL,
    post_id INT NOT NULL, 
    PRIMARY KEY (id),
    CONSTRAINT unique_user_post UNIQUE (user_id, post_id)
);

-- migrate:down

