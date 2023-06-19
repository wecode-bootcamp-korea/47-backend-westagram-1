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


const createPosting = async (title,content,user_id,posting_image_url) =>{
    try {  
          return await appDataSource.query(
           `
           INSERT INTO posts (
              title,
              content,
              user_id,
              posting_image_url
              ) VALUES (
              ?,?,?,?
             )
             `,
         [title, content,user_id,posting_image_url]);
    }catch (err) {
     const error = new Error('INVALID_DATA_INPUT');
     error.statusCode = 500;
     throw error;
 }
};

    const postdata = async function(){
        return await appDataSource.query(
            `
          SELECT
            users.id AS userId,
            users.profile_image AS userProfileImage,
            posts.id AS postingId,
            posts.posting_image_url AS PostingImageUrl,
            posts.content AS PostingContent
          FROM
            users, posts
          WHERE
            users.id = posts.id
          `)

        };
      
     

module.exports={
    createPosting ,postdata
}