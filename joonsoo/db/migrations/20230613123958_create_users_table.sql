-- migrate:up
CREATE TABLE users 
(
  id INT NOT NULL AUTO_INCREMENT,                        
  name VARCHAR(50) NOT NULL,                         
  email VARCHAR(200) NOT NULL UNIQUE,
  profile_image VARCHAR(1000) NULL,    
  password VARCHAR(200) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),           
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)                                      
);                

-- migrate:down
DROP TABLE users
