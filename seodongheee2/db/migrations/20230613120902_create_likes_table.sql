-- migrate:up
create table likes(
    id int not null auto_increment,
    user_id int not null,
    post_id int not null, 
    primary key (id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id)
);

-- migrate:down

