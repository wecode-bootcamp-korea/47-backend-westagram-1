-- migrate:up
create table posts(
    id int not null auto_increment,
    title varchar(100) not null,
    content varchar(3000) null,
    user_id int not null ,
    created_at timestamp not null default current_timestamp,
    updated_at timestamp null on update current_timestamp,
    primary key (id),
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (user_id) REFERENCES users(id));


-- migrate:down

