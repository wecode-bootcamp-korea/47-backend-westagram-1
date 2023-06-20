-- migrate:up
ALTER TABLE users CHANGE profile_image profileImage VARCHAR(1000) NULL,
-- migrate:down

