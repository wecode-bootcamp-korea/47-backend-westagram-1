-- migrate:up
 SET FOREIGN_KEY_CHECKS =0;
 ALTER TABLE POSTS ADD FOREIGN KEY (user_id) REFERENCES users(id);
 SET FOREIGN_KEY_CHECKS =1;

-- migrate:down
