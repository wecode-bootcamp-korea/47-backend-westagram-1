-- migrate:up
    ALTER TABLE posts ADD COLUMN posting_image_url VARCHAR(3000) NULL;
    -- ALTER TABLE posts ADD COLUMN FOREIGN KEY (post_id) REFERENCES posts(id);
    -- ALTER TABLE posts ADD COLUMN FOREIGN KEY (user_id) REFERENCES users(id);
    

-- migrate:down

