const { DataSource } = require('typeorm');

const appDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})

appDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error occurred during Data Source initialization", err);
	  appDataSource.destroy();
  });


  const createUser = async ( name, email, profile_image, password ) => {
    try {
        return await myDataSource.query(
        `INSERT INTO users(
            name,
            email,
            profile_image,
            password
        ) VALUES (?, ?, ?, ?);
        `,
        [ name, email, profile_image, password ]
      );
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
};

const personalPostD= async function (userId){

  return await appDataSource.query(
          `
          SELECT
                users.id AS userId,
                users.profile_image AS userProfileImage,
                JSON_ARRAYAGG(
                 JSON_OBJECT( 
                 "postingId", posts.id,
                 "PostingImageUrl", posts.posting_image_url,
                 "PostingContent", posts.content
                 ) 
                 )AS postings
          FROM users 
          JOIN posts ON users.id = posts.user_id
          WHERE users.id =?
          `,
          [userId]
  );
          };

module.exports={
    createUser ,personalPostD
}
