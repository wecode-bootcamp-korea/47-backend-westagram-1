-- migrate:up
ALTER TABLE likes
ADD CONSTRAINT like_person UNIQUE (user_id, post_id)

-- migrate:down

