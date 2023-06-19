const {appDataSource}=require("./dataSource");

const createUser = async ( name, email, profileImage, password ) => {
    try {
        return await appDataSource.query(
        `INSERT INTO users(
            name,
            email,
            profileImage,
            password
        ) VALUES (?, ?, ?, ?);
        `,
        [ name, email, profileImage, password ]
      );
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
};


const personalPostD = async function (userId) {
  return await appDataSource.query(
    `
    SELECT
      users.id AS UserId,
      users.profileImage AS userProfileImage,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          "postingId", posts.id,
          "PostingImageUrl",posts.postingImageUrl,
          "PostingContent",posts.content
        )
      ) AS postings
    FROM users
    JOIN posts ON users.id=posts.userId
    WHERE users.id = ?
    `,
    [userId]
  );
};




module.exports={
    createUser ,personalPostD
}
